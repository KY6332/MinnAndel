# MinnAndel 2.1 — hvad der er afleveringsklart, og hvad der mangler

## Kodet i denne patch (skal stadig testes i Expo Go)
- Samlet redesign af forside, kort, typografi, knapper og farver.
- Synligt logout på forside + bekræftelse i indstillinger for alle tre roller.
- Rollebaserede genveje for beboer, bestyrelse og vicevært.
- Beboer kan se status på **egne** fejlmeldinger (Firestoreregler opdateret).
- Bestyrelse kan oprette opgaver og fælles nyheder uden Firebase Console.
- Bestyrelse kan oprette bookingfaciliteter fra appen.
- Alle kan søge i kontaktlisten; bestyrelsen kan tilføje kontakter.
- Chat fungerer i gratis “dokumentopslag”-tilstand, tydeligt adskilt fra rigtig OpenAI.
- Login viser nu Firebase-fejlkode, hvis der sker fejl.

## Allerede eksisterende fra v2-pakken
- Firebase Authentication og rolleprofiler.
- Firestore persistence af kontaktliste, faciliteter, opgaver, fejlmeldinger, dokumenter.
- QR-udlån til equipment-ID'er med transaktion.
- Notifikationspræferencer gemmes lokalt (ikke push).
- Backendfunktion til OpenAI — ikke deployet i denne patch.

## Skal stadig gøres manuelt i brugerens eget miljø
1. Udpak/copy patch ind i originalrepo. Ingen automatisk git push.
2. Upload firestore.rules: `npx firebase-tools deploy --only firestore:rules`.
3. Test Firestore-roller og datalagring i Expo Go.
4. Opret equipment-objekt `drill01` manuelt i Firestore, før QR-test.
5. Evt. deploy AI med ny secret og Blaze-plan. Ellers dokumentopslag uden betaling.
6. Optag demovideo; opdatér offentligt GitHub; skriv individuel rapport; aflever ZIP uden node_modules.
7. Foretag reel brugerinddragelse, hvis opgavekravet skal opfyldes. Simuleringer tæller ikke.

## Bevidst fravalgt for at nå et minimum viable produkt
- Faktiske pushnotifikationer
- PDF-upload/automatisk dokumentindeksering
- Kalenderbooking med dato/tidsrum
- Rolle-administration i appen (roller tildeles sikkert i Firebase Console)

## Ærlig teststatus
- JavaScript- og JSX-filer er syntaksvalideret.
- Lokal dokumentopslag-logik er testet med simulerede data.
- Firebase-regler, React Native-rendering, Expo Go og live Firestore-flow er IKKE integrationstestet her og kræver test på en fysisk telefon.
