// One data layer: AsyncStorage for demo; Firestore for authenticated users.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, onSnapshot, query, runTransaction, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { demoData } from './demoData';

const keyFor = (name) => `@minnandel-v2-demo:${name}`;
const permitted = new Set(['news', 'contacts', 'facilities', 'equipment', 'tasks', 'reports', 'documents']);
function checkName(name) { if (!permitted.has(name)) throw new Error('Ukendt datasamling'); }

async function readDemo(name) {
  const raw = await AsyncStorage.getItem(keyFor(name));
  return raw ? JSON.parse(raw) : (demoData[name] || []).map(x => ({ ...x }));
}
async function updateDemo(name, updater) {
  const list = await readDemo(name);
  const updated = updater(list);
  await AsyncStorage.setItem(keyFor(name), JSON.stringify(updated));
  return updated;
}

export function observeList(name, demo, onData, onError) {
  checkName(name);
  if (!demo) {
    return onSnapshot(collection(db, name), snapshot => {
      onData(snapshot.docs.map(item => ({ ...item.data(), id: item.id })));
    }, error => onError?.(error.message));
  }
  let active = true;
  readDemo(name).then(items => { if (active) onData(items); }).catch(e => onError?.(e.message));
  return () => { active = false; };
}

export async function createEntry(name, data, demo) {
  checkName(name);
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  if (demo) await updateDemo(name, items => [...items, { ...data, id }]);
  else await setDoc(doc(db, name, id), { ...data, createdAt: serverTimestamp() });
  return id;
}
export async function patchEntry(name, id, changes, demo) {
  checkName(name);
  if (demo) await updateDemo(name, items => items.map(item => item.id === id ? { ...item, ...changes } : item));
  else await updateDoc(doc(db, name, id), { ...changes, updatedAt: serverTimestamp() });
}

// Firestore transaction prevents two people booking the same facility simultaneously.
export async function toggleFacility(facility, uid, demo) {
  if (demo) {
    await updateDemo('facilities', items => items.map(f => {
      if (f.id !== facility.id) return f;
      if (f.status === 'available') return { ...f, status: 'booked', bookedBy: uid };
      if (f.bookedBy === uid) return { ...f, status: 'available', bookedBy: null };
      throw new Error('Faciliteten er allerede booket af en anden.');
    }));
    return;
  }
  await runTransaction(db, async tx => {
    const ref = doc(db, 'facilities', facility.id);
    const snapshot = await tx.get(ref);
    if (!snapshot.exists()) throw new Error('Faciliteten findes ikke.');
    const f = snapshot.data();
    if (f.status === 'available') tx.update(ref, { status: 'booked', bookedBy: uid, updatedAt: serverTimestamp() });
    else if (f.bookedBy === uid) tx.update(ref, { status: 'available', bookedBy: null, updatedAt: serverTimestamp() });
    else throw new Error('Faciliteten er allerede booket.');
  });
}

// QR format: minnandel:item:<Firestore document ID>. Check-out or return.
export function readEquipmentQR(raw) {
  const match = /^minnandel:item:([a-zA-Z0-9_-]{1,80})$/.exec(String(raw).trim());
  return match ? match[1] : null;
}
export async function toggleEquipment(id, uid, demo) {
  if (demo) {
    const current = (await readDemo('equipment')).find(item => item.id === id);
    if (!current) throw new Error('Ukendt udstyr.');
    if (current.status === 'borrowed' && current.borrowerId !== uid) throw new Error('Udstyret er allerede udlånt.');
    const borrowing = current.status === 'available';
    await patchEntry('equipment', id, { status: borrowing ? 'borrowed' : 'available', borrowerId: borrowing ? uid : null }, true);
    return borrowing ? 'Udstyret er registreret som lånt af dig.' : 'Udstyret er registreret som afleveret.';
  }
  return runTransaction(db, async tx => {
    const ref = doc(db, 'equipment', id);
    const snapshot = await tx.get(ref);
    if (!snapshot.exists()) throw new Error('QR-koden matcher ikke registreret udstyr.');
    const current = snapshot.data();
    if (current.status === 'borrowed' && current.borrowerId !== uid) throw new Error('Udstyret er allerede udlånt.');
    const borrowing = current.status === 'available';
    if (!borrowing && current.status !== 'borrowed') throw new Error('Ugyldig udstyrsstatus.');
    tx.update(ref, { status: borrowing ? 'borrowed' : 'available', borrowerId: borrowing ? uid : null, updatedAt: serverTimestamp() });
    return borrowing ? 'Udstyret er registreret som lånt af dig.' : 'Udstyret er registreret som afleveret.';
  });
}

export async function getVisibleDemoDocuments(role) {
  const all = await readDemo('documents');
  return all.filter(d => d.published && (role === 'board' || d.visibility === 'members'));
}

export function observeDocuments(role, demo, onData, onError) {
  if (demo) {
    let active = true;
    getVisibleDemoDocuments(role).then(items => { if (active) onData(items); }).catch(e => onError?.(e.message));
    return () => { active = false; };
  }
  // Firestore rules are not filters: non-board users MUST query only permitted docs.
  const ref = role === 'board' ? collection(db, 'documents') : query(collection(db, 'documents'), where('visibility', '==', 'members'), where('published', '==', true));
  return onSnapshot(ref, snapshot => onData(snapshot.docs.map(d => ({ ...d.data(), id: d.id }))), error => onError?.(error.message));
}

// Residenternes egne fejlmeldinger kan hentes uden adgang til andres data.
export function observeOwnReports(uid, demo, onData, onError) {
  if (demo) {
    let active = true;
    readDemo('reports').then(items => { if (active) onData(items.filter(x => x.createdBy === uid)); })
      .catch(e => onError?.(e.message));
    return () => { active = false; };
  }
  const ownQuery = query(collection(db, 'reports'), where('createdBy', '==', uid));
  return onSnapshot(ownQuery, snapshot => {
    onData(snapshot.docs.map(item => ({ ...item.data(), id: item.id })));
  }, error => onError?.(error.message));
}
