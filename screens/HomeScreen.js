import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Page, Section, Card, Muted, ErrorText, Hero, ActionTile } from '../components/UI';
import useEntries from '../hooks/useEntries';
import { useApp } from '../context/AppContext';
import styles, { colors } from '../styles/theme';

const roleLabels = { resident: 'BEBOER', board: 'BESTYRELSE', caretaker: 'VICEVÆRT' };
const shortcuts = {
  resident: [
    ['Booking', '📅', 'Book fællesfaciliteter', 'Se ledige ressourcer'],
    ['Scanner', '📷', 'Lån fællesudstyr', 'Scan en QR-kode'],
    ['Report', '🛠️', 'Fejlmelding', 'Fortæl viceværten om et problem'],
    ['Documents', '📄', 'Dokumenter', 'Læs foreningens information'],
  ],
  board: [
    ['Board', '✅', 'Opgaver og nyheder', 'Administrér foreningen'],
    ['Documents', '📑', 'Dokumenter', 'Del information og økonomi'],
    ['Caretaker', '🛠️', 'Fejlmeldinger', 'Følg vedligeholdelse'],
    ['Booking', '📅', 'Faciliteter', 'Se og opret ressourcer'],
  ],
  caretaker: [
    ['Caretaker', '🛠️', 'Vedligeholdelse', 'Se og opdatér fejlmeldinger'],
    ['Scanner', '📷', 'Fællesudstyr', 'Scan QR ved udlån'],
    ['Booking', '📅', 'Faciliteter', 'Se bookingstatus'],
    ['Documents', '📄', 'Dokumenter', 'Læs fælles information'],
  ],
};

export default function HomeScreen({ navigation }) {
  const { role, demo, logout } = useApp();
  const { items: news, error } = useEntries('news');
  function confirmLogout() {
    Alert.alert('Log ud?', 'Du kan derefter logge ind som en anden bruger.', [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Log ud', style: 'destructive', onPress: () => logout().catch(() => Alert.alert('Fejl', 'Kunne ikke logge ud. Prøv igen.')) },
    ]);
  }
  return <Page>
    <Hero eyebrow={`MINNANDEL · ${roleLabels[role] || 'MIN KONTO'}${demo ? ' · DEMO' : ''}`} title="Velkommen hjem" description="Alt det praktiske i din boligforening – samlet ét sted." />
    <View style={[styles.row, { paddingHorizontal: 2 }]}>
      <Text style={{ color: colors.ink, fontWeight: '800', fontSize: 17 }}>Dit overblik</Text>
      <Pressable accessibilityRole="button" onPress={confirmLogout} style={{ padding: 8 }}><Text style={{ color: colors.primary, fontSize: 14, fontWeight: '800' }}>Log ud ↗</Text></Pressable>
    </View>
    <View style={styles.tileRow}>
      {(shortcuts[role] || []).map(([screen, icon, title, description]) => <ActionTile key={screen} icon={icon} title={title} description={description} onPress={() => navigation.navigate(screen)} />)}
    </View>
    <Section>Fælles for alle</Section>
    <View style={styles.tileRow}>
      <ActionTile icon="☎️" title="Kontakter" description="Find håndværkere og samarbejdspartnere" onPress={() => navigation.navigate('Contacts')} />
      <ActionTile icon="✦" title="Spørg MinnAndel" description="Find svar i foreningens dokumenter" onPress={() => navigation.navigate('Chat')} />
      <ActionTile icon="⚙️" title="Indstillinger" description="Notifikationer og konto" onPress={() => navigation.navigate('Settings')} />
    </View>
    <Section>Seneste nyt</Section>
    <ErrorText>{error}</ErrorText>
    {news.length === 0 && <Card><Muted>Ingen opslag endnu. Bestyrelsen kan offentliggøre den første nyhed.</Muted></Card>}
    {news.slice(0, 5).map(item => <Card key={item.id}><Text style={styles.cardTitle}>{item.title}</Text><Muted>{item.description}</Muted></Card>)}
  </Page>;
}
