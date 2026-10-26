import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Page, Title, Sub, Section, Card, Button, Heading, Muted, Badge, Field, ErrorText } from '../components/UI';
import { useApp } from '../context/AppContext';
import useEntries from '../hooks/useEntries';
import { createEntry } from '../services/store';

export default function DocumentsScreen() {
  const { role, demo } = useApp();
  const { items, error, refresh } = useEntries('documents');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Økonomi');
  const [visibility, setVisibility] = useState('members');
  const [busy, setBusy] = useState(false);
  async function publish() {
    if (!title.trim() || !content.trim()) return;
    setBusy(true);
    try {
      await createEntry('documents', { title: title.trim(), category: category.trim(), content: content.trim(), visibility, published: true }, demo);
      setTitle(''); setContent(''); refresh();
      Alert.alert('Gemt', visibility === 'members' ? 'Noten kan læses af alle foreningens brugere.' : 'Noten kan kun læses af bestyrelsen.');
    } catch (e) { Alert.alert('Dokument', e.message); }
    finally { setBusy(false); }
  }
  return <Page>
    <Title>Dokumenter og økonomi</Title>
    <Sub>Offentliggjorte informationer og regnskabsnoter. Interne noter er kun til bestyrelsen.</Sub>
    <ErrorText>{error}</ErrorText>
    {items.length === 0 && <Muted>Ingen dokumenter tilgængelige endnu.</Muted>}
    {items.filter(d => d.published).map(d => <Card key={d.id}>
      <Badge>{d.category || 'Information'} {d.visibility === 'board' ? '· Intern' : ''}</Badge>
      <Heading>{d.title}</Heading><Muted>{d.content}</Muted>
    </Card>)}
    {role === 'board' && <>
      <Section>Opret tekstnote</Section>
      <Card>
        <Field label="Titel" value={title} onChangeText={setTitle} placeholder="Fx Regnskab 2025 – hovedtal" />
        <Field label="Kategori" value={category} onChangeText={setCategory} placeholder="Økonomi, referat, praktisk" />
        <Field label="Indhold" value={content} onChangeText={setContent} multiline placeholder="Indsæt godkendte informationer her ..." />
        <Sub>Hvem må læse noten?</Sub>
        <Button title={visibility === 'members' ? '✓ Alle i foreningen' : 'Alle i foreningen'} secondary onPress={() => setVisibility('members')} />
        <Button title={visibility === 'board' ? '✓ Kun bestyrelsen' : 'Kun bestyrelsen'} secondary onPress={() => setVisibility('board')} />
        <Button title="Offentliggør note" onPress={publish} loading={busy} disabled={!title.trim() || !content.trim()} />
      </Card>
      <Muted>Upload af PDF-filer kræver en separat Storage-funktion. Denne version understøtter tekstbaserede noter.</Muted>
    </>}
  </Page>;
}
