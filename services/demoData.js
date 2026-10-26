// Fictional demo data, not actual contacts or financial statements.
export const demoData = {
  news: [
    { id: 'water', title: 'Information fra foreningen', description: 'Dette er et eksempel på en fælles besked.', date: 'Demo' },
    { id: 'meeting', title: 'Velkommen til MinnAndel', description: 'Se booking, kontakter og fælles udstyr i appen.', date: 'Demo' },
  ],
  contacts: [
    { id: 'vvs', name: 'VVS-partner (eksempel)', category: 'Håndværker', phone: '', details: 'Bestyrelsen kan indsætte telefonnummer.' },
    { id: 'electrician', name: 'Elektriker (eksempel)', category: 'Håndværker', phone: '', details: 'Telefonnummer ikke udfyldt.' },
    { id: 'restaurant', name: 'Lokal restaurant (eksempel)', category: 'Lokalt', phone: '', details: 'Mulig samarbejdspartner.' },
  ],
  facilities: [
    { id: 'common-room', name: 'Fælleslokale', description: 'Plads til ca. 30 personer', status: 'available', bookedBy: null },
    { id: 'guest-room', name: 'Gæsteværelse', description: 'Overnatning for gæster', status: 'available', bookedBy: null },
    { id: 'trailer', name: 'Trailer', description: 'Foreningens fælles trailer', status: 'available', bookedBy: null },
  ],
  equipment: [
    { id: 'drill01', name: 'Boremaskine', description: 'Scan mærkaten for at låne', status: 'available', borrowerId: null },
    { id: 'ladder01', name: 'Stige', description: 'Scan mærkaten for at låne', status: 'available', borrowerId: null },
  ],
  tasks: [
    { id: 'windows', title: 'Indhent tilbud på nye vinduer', done: false },
    { id: 'container', title: 'Bestil container', done: false },
    { id: 'meeting', title: 'Forbered generalforsamling', done: false },
  ],
  reports: [],
  documents: [
    { id: 'welcome', title: 'Om booking (demo)', category: 'Praktisk', content: 'Du kan booke fælleslokale og gæsteværelse i MinnAndel. Demoindhold, ikke en officiel husorden.', visibility: 'members', published: true },
  ],
};
