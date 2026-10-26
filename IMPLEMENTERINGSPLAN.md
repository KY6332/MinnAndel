# Implementeringsplan – MinnAndel 2.0

## Udgangspunkt

Første version fra KY6332/MinnAndel indeholdt HomeScreen, BookingScreen og BoardScreen samt React Navigation. Bookinger og bestyrelsesopgaver var lokale React `useState`-data, som ikke blev gemt mellem app-genstarter.

## Afleveringsrelevant iteration

| Prioritet | Ændring | Status i opdateringspakken | Test |
| --- | --- | --- | --- |
| P0 | Tre rollebestemte startskærme | Implementeret, med demotilstand og Firebase Auth | Skift rolle i Expo Go |
| P0 | Ny viceværtfunktion | Implementeret: fejlmeldinger og statusskift | Indsend fejlmelding som beboer; skift til vicevært |
| P0 | Persistent data | AsyncStorage i demo, Firestore i live | Book noget, genstart appen |
| P1 | Kontaktliste | Implementeret: læsning, ringeknap og oprettelse som bestyrelse | Opret testkontakt, ring op |
| P1 | QR-udstyr | Implementeret: QR-scanner, validering, transaktion | Scan medfølgende QR på anden skærm |
| P1 | Dokumentnoter | Implementeret: bestyrelsen publicerer tekstnote | Tjek rollebaseret læsning |
| P1 | Chatbot | Serverkode implementeret; kræver Firebase, hemmelig API-nøgle og deployment | Deploy Function, spørg om publiceret note |
| P1 | Notifikationsindstillinger | Præferencer implementeret lokalt | Slå fra, genstart appen |
| P2 | Automatisk push | IKKE implementeret | Kræver backend og push-tokens |
| P2 | Upload/udtræk af PDF | IKKE implementeret | Kræver Storage og dokumentparser |
| P2 | Kalenderbooking med tidsrum | IKKE implementeret | Kræver datomodel og reservationer |
| P2 | Produktimplementering og sikkerhedsaudit | IKKE udført | Test rettigheder og privatliv |

## Kursusmateriale anvendt som vejvisere

CBS-INNT-26's offentlige repository indeholder bl.a. øvelser for navigation (02), Firestore (05), Firebase login (06), kamera (07), notifikationer (09) og AI (10). Koden i denne opdatering er en selvstændig tilpasning til MinnAndels datamodel; den er ikke identisk med øvelserne.

## Restarbejde før aflevering

1. Installer pakker og bekræft, at demoen åbner på en fysisk telefon i Expo Go.
2. Konfigurer Firebase, skriv Firestore-eksempeldata og deploy regelsæt.
3. Konfigurer og deploy AI Cloud Function (kræver gyldig kursus-API-nøgle).
4. Test adgang til bestyrelsesnoter med mindst to autentificerede brugere.
5. Lav ny demovideo og tilføj linket i README.
6. Dokumentér feedback fra anden brugerrunde og egen læring i individuel rapport.

## Risiko og afgrænsning

- Databasens adgangsregler skal efterprøves med Firebase Emulator/Rules tests; serverkode har ikke været deployet i denne generering.
- AI-modellen modtager tekst fra publicerede noter; giv ikke personfølsomme eller hemmelige regnskabsdetaljer uden konkret godkendelse.
- Demotilstanden er bevidst uden autentifikation. Kun live-tilstanden anvender serverhåndhævede adgangsregler.
- Expo Go-notifikationspræferencer er ikke implementering af pushbeskeder.
