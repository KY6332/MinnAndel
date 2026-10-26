import React, { useEffect, useState } from 'react';
import { Switch, View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Page, Title, Sub, Section, Card, Button, Muted, ErrorText } from '../components/UI';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/theme';

const defaults = { news: true, bookings: true, maintenance: true };
export default function SettingsScreen() {
  const { user, demo, role, logout } = useApp();
  const [settings, setSettings] = useState(defaults);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const key = `@minnandel-notification-preferences:${user.uid}`;
  function confirmLogout() {
    Alert.alert('Log ud?', 'Du kan bagefter skifte bruger.', [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Log ud', style: 'destructive', onPress: () => logout().catch(() => Alert.alert('Fejl', 'Kunne ikke logge ud.')) },
    ]);
  }
  useEffect(() => {
    let mounted = true;
    setReady(false);
    AsyncStorage.getItem(key).then(raw => {
      if (mounted) setSettings(raw ? { ...defaults, ...JSON.parse(raw) } : defaults);
    }).catch(() => { if (mounted) setError('Indstillingerne kunne ikke indlæses.'); }).finally(() => { if (mounted) setReady(true); });
    return () => { mounted = false; };
  }, [key]);
  async function toggle(name, enabled) {
    const next = { ...settings, [name]: enabled };
    setSettings(next);
    try { await AsyncStorage.setItem(key, JSON.stringify(next)); }
    catch { setError('Indstillingerne kunne ikke gemmes.'); }
  }
  const toggles = [
    { key: 'news', label: 'Nyheder fra foreningen' },
    { key: 'bookings', label: 'Booking og fællesudstyr' },
    { key: 'maintenance', label: 'Vedligeholdelse og driftsbeskeder' },
  ];
  return <Page>
    <Title>Indstillinger</Title><Sub>Dit personlige overblik – gælder for alle brugerroller.</Sub>
    <Section>Notifikationspræferencer</Section>
    <Card>
      {toggles.map(toggle => <View key={toggle.key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingVertical: 8 }}>
        <Text style={{ flex: 1, color: colors.ink, fontSize: 15 }}>{toggle.label}</Text>
        <Switch accessibilityLabel={toggle.label} value={Boolean(settings[toggle.key])} disabled={!ready} onValueChange={(v) => toggle(toggle.key, v)} trackColor={{ true: colors.primary }} />
      </View>)}
    </Card>
    <ErrorText>{error}</ErrorText>
    <Muted>Valgene gemmes lokalt, også efter appen lukkes. Automatisk udsendelse af pushnotifikationer er endnu ikke koblet til; det kræver en notifikationstjeneste.</Muted>
    <Section>Konto</Section>
    <Card><Muted>Rolle: {role}{demo ? ' · Demo' : ''}</Muted><Button title={demo ? 'Vælg en anden rolle' : 'Log ud'} secondary onPress={confirmLogout} /></Card>
  </Page>;
}
