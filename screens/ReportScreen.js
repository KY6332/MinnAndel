import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Page, Title, Sub, Card, Field, Button, ErrorText, Section, Heading, Badge, Muted } from '../components/UI';
import { useApp } from '../context/AppContext';
import { createEntry, observeOwnReports } from '../services/store';

const statuses = { open: 'Åben', in_progress: 'I gang', closed: 'Afsluttet' };
export default function ReportScreen({ navigation }) {
  const { user, demo, role } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState(false);
  const [myReports, setMyReports] = useState([]);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (role !== 'resident') return;
    setError('');
    return observeOwnReports(user.uid, demo, setMyReports, setError);
  }, [user?.uid, role, demo, version]);
  if (role !== 'resident') return <Page><Title>Kun for beboere</Title></Page>;
  async function submit() {
    if (!title.trim() || !description.trim()) return;
    setBusy(true);
    try {
      await createEntry('reports', { title: title.trim(), description: description.trim(), status: 'open', createdBy: user.uid }, demo);
      setTitle(''); setDescription(''); setVersion(v => v + 1);
      Alert.alert('Tak', 'Fejlmeldingen er registreret. Du kan følge status på denne side.');
    } catch (e) { Alert.alert('Kunne ikke gemme', e.message); }
    finally { setBusy(false); }
  }
  return <Page>
    <Title>Fejlmelding</Title><Sub>Fortæl viceværten, hvad der skal kigges på, og følg status.</Sub>
    <Card>
      <Field label="Overskrift" value={title} onChangeText={setTitle} placeholder="Fx utæt vandhane" />
      <Field label="Beskrivelse" value={description} onChangeText={setDescription} placeholder="Hvor er problemet?" multiline />
      <Button title="Send fejlmelding" onPress={submit} loading={busy} disabled={!title.trim() || !description.trim()} />
    </Card>
    <Section>Mine fejlmeldinger</Section><ErrorText>{error}</ErrorText>
    {myReports.length === 0 && <Card><Muted>Du har ikke indsendt nogen fejlmeldinger endnu.</Muted></Card>}
    {myReports.map(report => <Card key={report.id}>
      <Heading>{report.title}</Heading><Muted>{report.description}</Muted><Badge>{statuses[report.status] || 'Ukendt status'}</Badge>
    </Card>)}
  </Page>;
}
