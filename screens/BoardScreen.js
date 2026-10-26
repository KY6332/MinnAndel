import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Page, Title, Sub, Section, Card, Button, Heading, Muted, Badge, Field, ErrorText } from '../components/UI';
import useEntries from '../hooks/useEntries';
import { useApp } from '../context/AppContext';
import { createEntry, patchEntry } from '../services/store';

// Opgaver og nyheder kan nu oprettes i appen, uden at åbne Firebase Console.
export default function BoardScreen({ navigation }) {
  const { role, demo } = useApp();
  const { items: tasks, error, refresh } = useEntries('tasks');
  const { refresh: refreshNews } = useEntries('news');
  const [taskTitle, setTaskTitle] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [busy, setBusy] = useState(null);
  if (role !== 'board') return <Page><Title>Ingen adgang</Title><Sub>Kun bestyrelsen kan redigere opgaver og nyheder.</Sub></Page>;

  async function toggle(item) {
    setBusy(item.id);
    try { await patchEntry('tasks', item.id, { done: !item.done }, demo); refresh(); }
    catch (e) { Alert.alert('Opgave', e.message); }
    finally { setBusy(null); }
  }
  async function addTask() {
    if (!taskTitle.trim()) return;
    setBusy('task');
    try { await createEntry('tasks', { title: taskTitle.trim(), done: false }, demo); setTaskTitle(''); refresh(); }
    catch (e) { Alert.alert('Opgave', e.message); }
    finally { setBusy(null); }
  }
  async function addNews() {
    if (!newsTitle.trim() || !newsDescription.trim()) return;
    setBusy('news');
    try {
      await createEntry('news', { title: newsTitle.trim(), description: newsDescription.trim(), date: new Date().toISOString().slice(0, 10) }, demo);
      setNewsTitle(''); setNewsDescription(''); refreshNews();
      Alert.alert('Offentliggjort', 'Opslaget er tilgængeligt på forsiden.');
    } catch (e) { Alert.alert('Nyhed', e.message); }
    finally { setBusy(null); }
  }
  return <Page>
    <Title>Bestyrelsen</Title><Sub>Opret nyheder, følg opgaver og del vigtig information.</Sub>
    <Button title="Dokumenter og økonomi" onPress={() => navigation.navigate('Documents')} secondary />
    <Button title="Administrér kontaktliste" onPress={() => navigation.navigate('Contacts')} secondary />
    <Section>Opgaver</Section><ErrorText>{error}</ErrorText>
    {tasks.length === 0 && <Card><Muted>Der er ingen opgaver endnu.</Muted></Card>}
    {tasks.map(item => <Card key={item.id}><Heading>{item.title}</Heading>
      <Badge>{item.done ? 'Afsluttet' : 'Afventer'}</Badge>
      <Button title={item.done ? 'Genåbn' : 'Markér færdig'} onPress={() => toggle(item)} loading={busy === item.id} secondary />
    </Card>)}
    <Card><Heading>Ny opgave</Heading><Field label="Beskrivelse" value={taskTitle} onChangeText={setTaskTitle} placeholder="Fx Indhent tilbud fra VVS" />
      <Button title="Tilføj opgave" disabled={!taskTitle.trim()} loading={busy === 'task'} onPress={addTask} /></Card>
    <Section>Nyt opslag til beboere</Section>
    <Card><Field label="Overskrift" value={newsTitle} onChangeText={setNewsTitle} placeholder="Fx Vaskeriet er lukket fredag" />
      <Field label="Besked" value={newsDescription} onChangeText={setNewsDescription} multiline placeholder="Skriv den information, alle skal se" />
      <Button title="Offentliggør opslag" disabled={!newsTitle.trim() || !newsDescription.trim()} loading={busy === 'news'} onPress={addNews} /></Card>
  </Page>;
}
