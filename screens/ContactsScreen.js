import React, { useMemo, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { Page, Title, Sub, Section, Card, Button, Heading, Muted, Badge, Field, ErrorText } from '../components/UI';
import { useApp } from '../context/AppContext';
import useEntries from '../hooks/useEntries';
import { createEntry } from '../services/store';

export default function ContactsScreen() {
  const { demo, role } = useApp();
  const { items, error, refresh } = useEntries('contacts');
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Håndværker');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const filtered = useMemo(() => items.filter(c => `${c.name || ''} ${c.category || ''} ${c.details || ''}`.toLocaleLowerCase('da').includes(search.trim().toLocaleLowerCase('da'))), [items, search]);

  async function call(contact) {
    const number = (contact.phone || '').replace(/[^+\d]/g, '');
    if (!/^\+?\d{6,15}$/.test(number)) {
      Alert.alert('Mangler nummer', 'Bestyrelsen har endnu ikke tilføjet et gyldigt telefonnummer.'); return;
    }
    try { await Linking.openURL(`tel:${number}`); }
    catch { Alert.alert('Opkald', 'Kunne ikke åbne telefonens opkaldsfunktion.'); }
  }
  async function addContact() {
    if (!name.trim() || !/^\+?[\d\s-]{6,20}$/.test(phone.trim())) {
      Alert.alert('Udfyld oplysninger', 'Skriv et navn og et gyldigt telefonnummer.'); return;
    }
    setBusy(true);
    try {
      await createEntry('contacts', { name: name.trim(), category: category.trim() || 'Andet', phone: phone.trim(), details: '' }, demo);
      setName(''); setPhone(''); refresh();
    } catch (e) { Alert.alert('Kontakt', e.message); }
    finally { setBusy(false); }
  }
  return <Page>
    <Title>Kontaktliste</Title><Sub>Håndværkere, vicevært og lokale samarbejdspartnere samlet ét sted.</Sub>
    <Field label="Søg efter navn eller kategori" value={search} onChangeText={setSearch} placeholder="Fx VVS, elektriker, restaurant" />
    <ErrorText>{error}</ErrorText>
    {filtered.length === 0 && <Card><Muted>{items.length ? 'Ingen kontakter matcher din søgning.' : 'Listen er tom. Bestyrelsen kan tilføje kontakter herunder.'}</Muted></Card>}
    {filtered.map(contact => <Card key={contact.id}>
      <Badge>{contact.category || 'Kontakt'}</Badge><Heading>{contact.name}</Heading>
      <Muted>{contact.details || contact.phone || 'Telefonnummer ikke tilføjet'}</Muted>
      <Button title={contact.phone ? `Ring til ${contact.name}` : 'Nummer mangler'} onPress={() => call(contact)} disabled={!contact.phone} secondary />
    </Card>)}
    {role === 'board' && <>
      <Section>Tilføj kontakt</Section>
      <Card>
        <Field label="Virksomhed eller navn" value={name} onChangeText={setName} placeholder="Fx Ejendommens VVS" />
        <Field label="Kategori" value={category} onChangeText={setCategory} placeholder="VVS, elektriker, restaurant" />
        <Field label="Telefonnummer" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+45 ..." />
        <Button title="Gem kontakt" onPress={addContact} loading={busy} disabled={!name.trim() || !phone.trim()} />
      </Card>
    </>}
    {demo && <Muted>Demokontakter er fiktive og har ingen numre. Bestyrelsen kan oprette en testkontakt.</Muted>}
  </Page>;
}
