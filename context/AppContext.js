import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, firebaseReady } from '../services/firebase';

const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [loading, setLoading] = useState(firebaseReady);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [demoRole, setDemoRole] = useState(null);
  useEffect(() => {
    if (!firebaseReady) return;
    let stopProfile = () => {};
    const stopAuth = onAuthStateChanged(auth, (current) => {
      setLoading(true);
      stopProfile();
      setUser(current);
      setRole(null);
      if (!current) { setLoading(false); return; }
      // IMPORTANT: Read the assigned role from Firestore, never a client role-picker.
      stopProfile = onSnapshot(doc(db, 'users', current.uid), (snap) => {
        const assigned = snap.exists() ? snap.data().role : null;
        setRole(['resident', 'board', 'caretaker'].includes(assigned) ? assigned : null);
        setLoading(false);
      }, () => { setRole(null); setLoading(false); });
    });
    return () => { stopProfile(); stopAuth(); };
  }, []);
  async function login(email, password) { await signInWithEmailAndPassword(auth, email.trim(), password); }
  async function logout() { if (firebaseReady) await signOut(auth); else setDemoRole(null); }
  function selectDemoRole(next) { if (['resident', 'board', 'caretaker'].includes(next)) setDemoRole(next); }
  const demo = !firebaseReady;
  return <AppContext.Provider value={{ demo, loading, user: demo ? (demoRole ? { uid: `demo-${demoRole}` } : null) : user,
    role: demo ? demoRole : role, login, logout, selectDemoRole }}>
    {children}
  </AppContext.Provider>;
}
export function useApp() { const ctx = useContext(AppContext); if (!ctx) throw new Error('AppProvider mangler'); return ctx; }
