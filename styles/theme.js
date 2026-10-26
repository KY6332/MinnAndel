import { StyleSheet } from 'react-native';

// Ét fælles designsystem. Farver og afstande holdes ude af skærm-komponenterne.
export const colors = {
  background: '#F3F6F5',
  card: '#FFFFFF',
  ink: '#183C35',
  muted: '#667B74',
  primary: '#176B59',
  primaryDark: '#124F43',
  primarySoft: '#E3F2ED',
  border: '#DEE8E4',
  danger: '#AC4946',
  warning: '#A7651D',
  white: '#FFFFFF',
  pale: '#EDF4F1',
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 56, gap: 13 },
  title: { fontSize: 29, letterSpacing: -0.7, fontWeight: '800', color: colors.ink },
  subtitle: { fontSize: 15, lineHeight: 23, color: colors.muted },
  section: { marginTop: 14, marginBottom: 1, fontSize: 18, fontWeight: '800', color: colors.ink },
  card: { padding: 17, borderRadius: 19, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, gap: 10, shadowColor: '#14352A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: colors.ink },
  text: { fontSize: 15, color: colors.ink, lineHeight: 23 },
  muted: { fontSize: 13, color: colors.muted, lineHeight: 20 },
  field: { backgroundColor: colors.white, padding: 14, borderWidth: 1, borderColor: colors.border, borderRadius: 13, fontSize: 16, color: colors.ink, minHeight: 48 },
  button: { borderRadius: 13, backgroundColor: colors.primary, paddingVertical: 14, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', minHeight: 48 },
  buttonText: { fontSize: 15, fontWeight: '700', color: colors.white },
  buttonSecondary: { backgroundColor: colors.primarySoft },
  buttonSecondaryText: { color: colors.primaryDark },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  badge: { paddingVertical: 6, paddingHorizontal: 11, borderRadius: 20, backgroundColor: colors.primarySoft, alignSelf: 'flex-start' },
  badgeText: { color: colors.primaryDark, fontSize: 12, fontWeight: '700' },
  note: { fontSize: 13, color: colors.muted, lineHeight: 20 },
  error: { fontSize: 13, color: colors.danger, lineHeight: 19 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border, marginVertical: 4 },
  inputLabel: { fontSize: 13, fontWeight: '700', color: colors.ink },
  hero: { backgroundColor: colors.primaryDark, borderRadius: 22, padding: 21, gap: 9, overflow: 'hidden' },
  heroEyebrow: { color: '#BCE4D8', fontSize: 12, fontWeight: '800', letterSpacing: 1.3 },
  heroTitle: { color: colors.white, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  heroDescription: { color: '#D2EBE1', fontSize: 14, lineHeight: 21 },
  tileRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 14, minHeight: 144, justifyContent: 'space-between', flexGrow: 1, flexBasis: '46%', gap: 10 },
  tileIcon: { backgroundColor: colors.primarySoft, width: 43, height: 43, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  tileTitle: { color: colors.ink, fontWeight: '800', fontSize: 15, lineHeight: 19 },
  tileDescription: { color: colors.muted, fontSize: 12, lineHeight: 17 },
});

export default styles;
