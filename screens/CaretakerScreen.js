import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Page, Title, Sub, Section, Card, Button, Heading, Muted, Badge, ErrorText } from '../components/UI';
import useEntries from '../hooks/useEntries';
import { useApp } from '../context/AppContext';
import { patchEntry } from '../services/store';

export default function CaretakerScreen({ navigation }) {
  const { role, demo } = useApp();
  const { items, error, refresh } = useEntries('reports');
  const [busy, setBusy] = useState(null);
  if (role !== 'caretaker' && role !== 'board') return <Page><Title>Ingen adgang</Title><Sub>Kun vicevært og bestyrelse kan se fejlmeldinger.</Sub></Page>;
  async function cycle(item) {
    setBusy(item.id);
    const next = item.status === 'open' ? 'in_progress' : item.status === 'in_progress' ? 'closed' : 'open';
    try { await patchEntry('reports', item.id, { status: next }, demo); refresh(); }
    catch (e) { Alert.alert('Fejlmelding', e.message); }
    finally { setBusy(null); }
  }
  return <Page>
    <Title>Vedligeholdelse</Title><Sub>Fejlmeldinger fra ejendommen.</Sub>
    <Button title="Se håndværkere og kontakter" onPress={() => navigation.navigate('Contacts')} secondary />
    <Section>Aktuelle fejlmeldinger</Section><ErrorText>{error}</ErrorText>
    {items.length === 0 && <Muted>Ingen fejlmeldinger endnu.</Muted>}
    {items.map(item => <Card key={item.id}>
      <Heading>{item.title}</Heading><Muted>{item.description}</Muted>
      <Badge>{{ open: 'Åben', in_progress: 'I gang', closed: 'Afsluttet' }[item.status] || 'Ukendt'}</Badge>
      <Button title="Skift status" secondary onPress={() => cycle(item)} loading={busy === item.id} />
    </Card>)}
  </Page>;
}
