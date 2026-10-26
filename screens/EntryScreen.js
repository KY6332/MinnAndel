import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Page, Title, Sub, Section, Card, Button, Field, ErrorText, Muted } from '../components/UI';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/theme';

export default function EntryScreen() {
  const { demo, loading, login, selectDemoRole, user, role, logout } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit() {
    setBusy(true); setError('');
    try { await login(email, password); }
    catch (e) { setError(`Kunne ikke logge ind (${e.code || 'ukendt fejl'}). Kontrollér konto og forbindelse.`); }
    finally { setBusy(false); }
  }
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator color={colors.primary} /></View>;
  return <Page>
    <Title>MinnAndel</Title>
    <Sub>Din forening samlet ét sted</Sub>
    {demo ? <>
      <Card><Sub>Demotilstand – vælg et view. Ændringer gemmes lokalt på din telefon, men er ikke delt med andre.</Sub></Card>
      <Section>Prøv appen som</Section>
      <Button title="🏠 Beboer" onPress={() => selectDemoRole('resident')} />
      <Button title="👥 Bestyrelse" secondary onPress={() => selectDemoRole('board')} />
      <Button title="🛠️ Vicevært" secondary onPress={() => selectDemoRole('caretaker')} />
    </> : user && !role ? <Card>
      <Sub>Din konto er logget ind, men mangler en rolle i Firestore.</Sub>
      <Muted>Opret dokumentet users/{user.uid} med role: resident, board eller caretaker. Rollen skal tildeles af administratoren – ikke af brugeren selv.</Muted>
      <Button title="Log ud" onPress={logout} secondary />
    </Card> : <Card>
      <Section>Log ind</Section>
      <Field label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="navn@eksempel.dk" />
      <Field label="Adgangskode" value={password} onChangeText={setPassword} secureTextEntry placeholder="Adgangskode" />
      <ErrorText>{error}</ErrorText>
      <Button title="Log ind" onPress={submit} loading={busy} disabled={!email.trim() || !password} />
      <Muted>En administrator opretter brugere og tildeler roller i Firebase.</Muted>
    </Card>}
  </Page>;
}
