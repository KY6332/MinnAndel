# MinnAndel 2.1 — INNT godkendelsesopgave 2

Videreudvikling af [MinnAndel](https://github.com/KY6332/MinnAndel), React Native/Expo. Appen har tre roller: **beboer**, **bestyrelse** og **vicevært**. Den oprindelige navigation, bookingidé og bestyrelsens opgaveoversigt er videreført.

> **Dette er en opdateringspakke** til det eksisterende GitHub-repository, ikke et selvstændigt Expo-projekt. Pakken indeholder ikke den oprindelige `assets/`, `index.js`, `package.json`, `.env` eller `node_modules/`.

## Funktioner (kodeversion 2.1)

| Rolle | Funktioner |
| --- | --- |
| Beboer | Fællesnyheder, enkel booking, QR-udlån, fejlmelding og status på egne fejlmeldinger, dokumenter |
| Bestyrelse | Opret opgaver og nyheder, opret faciliteter, administrér kontakter, dokumentnoter og fejlmeldinger |
| Vicevært | Se fejlmeldinger, skift status, se fællesfaciliteter, QR-udstyr |
| Alle | Søgbare kontakter med opkald, dokumentbaseret chatbot/dokumentopslag, notifikationspræferencer, tydelig logout |

Data gemmes i **Firestore** i liveversionen og i **AsyncStorage** i demotilstand (når Firebase-konfiguration mangler). Kontaktliste, booking, fejlmeldinger, opgaver og nyheder bliver ikke kun gemt i React state.

**Begrænsninger:** Booking er kun ledig/optaget (ikke dato/tid); notifikationsindstillinger er lokale præferencer og sender ikke push; dokumenter er tekstnoter, ikke PDF-upload. Udstyrs-QR-scanning kræver `equipment`-dokumenter i Firestore. Et svar fra lokal dokumentopslag er **ikke generativ AI**.

## Installér i eksisterende repository

1. Tag backup eller lav en Git-branch.
2. Kopiér hele indholdet af `MinnAndel_2_1_samlet_patch` oven i den eksisterende MinnAndel-mappe. Erstat identiske filer og flet mapper; behold `assets/`, `index.js`, `app.json`, `package.json`, `package-lock.json` og **din eksisterende `.env`**.
3. Tjek `.gitignore`:

```
.env
.env.*
!.env.example
.firebase/
functions/node_modules/
```

4. Fra rodmappen:

```bash
npm install
npx expo install firebase expo-camera @react-native-async-storage/async-storage @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npx expo start --clear
```

Scan QR-koden med Expo Go. Ved fejl: kopier fejlmeddelelsen, men del aldrig adgangskoder eller hemmelige nøgler.

## Firebase

Registrér en Firebase-webapp, og udfyld de seks `EXPO_PUBLIC_FIREBASE_*`-felter fra `.env.example` i din lokale `.env`. Aktivér Email/Password under Authentication og Firestore-databasen.

Opret testbrugere via **Firebase Authentication** og deres individuelle `users/{AuthUID}`-dokumenter i Firestore med `role` lig `resident`, `board` eller `caretaker`. Roller kan ikke ændres fra mobilappen.

Deploy Firestore-reglerne fra rodmappen (ny version giver beboeren adgang til query af **egne** fejlmeldinger, ikke andres):

```bash
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools deploy --only firestore:rules
```

### Opret demo-data

Det meste kan oprettes direkte i appen med en **bestyrelseskonto**: nyheder, opgaver, kontakter, faciliteter og dokumentnoter. Opret dog manuelt i Firebase Console et dokument med ID `drill01` under collection `equipment`:

| Felt | Type | Værdi |
| --- | --- | --- |
| `name` | string | `Boremaskine` |
| `description` | string | `Fællesværktøj` |
| `status` | string | `available` |
| `borrowerId` | null | `null` |

QR-kodens indhold er `minnandel:item:drill01`. Prøv med medfølgende `qr-examples/drill01.png` vist på en anden skærm. Scanneren registrerer lån/aflevering atomisk via Firestore-transaktioner.

### Test rolleflow

1. Bestyrelse: Opret nyhed, kontakt og facilitet. Opret en fælles, publiceret dokumentnote. Log ud.
2. Beboer: Se nyhed, book facilitet, søg kontakt, indsend fejlmelding og se dens status. Prøv dokumentopslaget. Log ud.
3. Vicevært: Se beboerens fejlmelding og ændr status til "I gang". Log ud.
4. Beboer: Kontrollér den opdaterede status.
5. Kontrollér med en beboerkonto, at bestyrelsens **interne** dokumentnoter ikke vises.

## Chatbot uden budget

I `.env` bør du have:

```
EXPO_PUBLIC_AI_ENABLED=false
```

Så bruger chatten **gratis lokalt dokumentopslag i tilladte Firestore-noter**, som markerer sine svar som ikke-AI. Det kræver ikke Firebase Blaze eller OpenAI-kald, men kræver, at der findes mindst én relevant dokumentnote.

Hvis I senere får adgang til en betalingsopsætning, kan I deploye `functions/index.js` som `askAssociation` med hemmelig OpenAI-nøgle på serveren:

```bash
cd functions && npm install && cd ..
npx firebase-tools functions:secrets:set OPENAI_API_KEY
npx firebase-tools deploy --only functions:askAssociation
```

Først efter vellykket deployment kan `EXPO_PUBLIC_AI_ENABLED=true` sættes i appens `.env`, og Expo genstartes. **Del aldrig OpenAI-nøglen i chat, GitHub eller Expo-variabler.** En tidligere delt nøgle bør tilbagekaldes. Firebase Functions kan kræve Blaze og OpenAI API-forespørgsler kan koste penge.


**Demo/video:** Indsæt et nyt link her, når du har optaget videoen: `[MinnAndel 2.1 demovideo](INDSAET_LINK)`.



https://github.com/user-attachments/assets/1ed06eec-2bfb-4bfa-a7a8-117c0b204ed4


