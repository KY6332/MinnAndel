import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Page, Title, Sub, Section, Card, Button, Heading, Muted, Badge, Field, ErrorText } from '../components/UI';
import { useApp } from '../context/AppContext';
import useEntries from '../hooks/useEntries';
import { createEntry, toggleFacility } from '../services/store';

// Simpel reservation af en ressource, ikke en kalenderbooking med datoer.
export default function BookingScreen() {
  const { user, demo, role } = useApp();
  const { items, error, refresh } = useEntries('facilities');
  const [busyId, setBusyId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  async function toggle(facility) {
    setBusyId(facility.id);
    try { await toggleFacility(facility, user.uid, demo); refresh(); }
    catch (e) { Alert.alert('Booking', e.message); }
    finally { setBusyId(null); }
  }
  async function addFacility() {
    if (!name.trim()) return;
    setBusyId('new');
    try {
      await createEntry('facilities', { name: name.trim(), description: description.trim(), status: 'available', bookedBy: null }, demo);
      setName(''); setDescription(''); refresh();
    } catch (e) { Alert.alert('Facilitet', e.message); }
    finally { setBusyId(null); }
  }
  return <Page>
    <Title>Fællesfaciliteter</Title><Sub>Se, hvilke fællesressourcer der er ledige, og registrér din reservation.</Sub>
    <ErrorText>{error}</ErrorText>
    {items.length === 0 && <Card><Muted>Der er ingen faciliteter endnu. Bestyrelsen kan oprette den første.</Muted></Card>}
    {items.map(f => {
      const mine = f.bookedBy === user.uid;
      const available = f.status === 'available';
      return <Card key={f.id}>
        <Heading>{f.name}</Heading><Muted>{f.description || 'Foreningens fællesfacilitet'}</Muted>
        <Badge>{available ? '● Ledig' : mine ? '● Reserveret af dig' : '● Optaget'}</Badge>
        <Button title={mine ? 'Annullér min reservation' : 'Reservér'} onPress={() => toggle(f)} disabled={!available && !mine} loading={busyId === f.id} />
      </Card>;
    })}
    {role === 'board' && <><Section>Opret facilitet</Section><Card>
      <Field label="Navn" value={name} onChangeText={setName} placeholder="Fx Fælleslokale" />
      <Field label="Beskrivelse" value={description} onChangeText={setDescription} placeholder="Hvor og hvad kan bookes?" />
      <Button title="Tilføj facilitet" disabled={!name.trim()} loading={busyId === 'new'} onPress={addFacility} />
    </Card></>}
    <Muted>Booking er et simpelt ledig/optaget-system i denne iteration. Dato- og tidsvalg er ikke implementeret.</Muted>
  </Page>;
}
