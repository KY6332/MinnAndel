# To simulerede førsteindtryk — IKKE interviews

**Vigtigt:** Nedenstående er to AI-genererede designgennemgange fra tænkte brugerperspektiver. De er **ikke** baseret på virkelige personer, observationer, interviews eller spørgeskemabesvarelser. De må **ikke** fremstilles som dokumenteret brugerinddragelse i INNT-rapporten og opfylder ikke kursuskravet om brugerinterviews.

## Perspektiv A — travl beboer

**Forestillet kontekst:** En beboer vil hurtigt finde en VVS'er, booke fælleslokalet og melde en lækage.

**Hypotetisk førsteindtryk:**
- Positivt: De vigtigste handlinger er nu på forsiden, og kontaktlisten kan søges efter kategori.
- Positivt: En indsendt fejlmelding kan ses med status, så beboeren ikke behøver ringe for at spørge, om den er modtaget.
- Mulig frustration: Booking har stadig ikke dato/tidsrum. “Optaget” kan derfor misforstås som optaget for altid.
- Mulig frustration: Notifikationsindstillingerne er ikke faktiske pushbeskeder, og det bør stå tydeligt.

**Mulig designbeslutning:** Behold enkel booking i demoen, men marker tydeligt, at kalenderbooking og push er næste iteration.

**Spørgsmål til en virkelig beboer:** “Kan du finde VVS-kontakten og lave en fejlmelding uden forklaring?” og “Hvad tror du, status ‘optaget’ betyder?”

## Perspektiv B — bestyrelsesmedlem med lidt tid

**Forestillet kontekst:** Et bestyrelsesmedlem vil skrive en fælles besked og dele et kort resumé af en vedtaget regnskabsnote.

**Hypotetisk førsteindtryk:**
- Positivt: Opslag og opgaver oprettes nu direkte i appen i stedet for i Firebase Console.
- Positivt: Interne og fælles dokumentnoter har forskellige synlighedsindstillinger.
- Mulig frustration: Det er mere besværligt at indsætte lange regnskabstekster manuelt end at uploade en PDF.
- Mulig bekymring: Bestyrelsen skal stole på, at beboere ikke får adgang til interne oplysninger; dette bør testes med separate konti.

**Mulig designbeslutning:** Vis tekstnoter som et afgrænset MVP, og verificér Firestore-adgang med to konti før demoen.

**Spørgsmål til et virkeligt bestyrelsesmedlem:** “Kan du oprette et opslag og finde indstillingen for en intern note?” og “Hvilken information ville du aldrig offentliggøre i appen?”

## Hvis der bliver tid til rigtig brugerfeedback

En 5–10 minutters samtale med to virkelige personer kan udføres uden budget, men vær opmærksom på, at opgavebeskrivelsen også kræver evaluering med brugere i anden runde. Notér for hvert faktisk interview: dato, relation/rolle (anonymiseret), 2–3 opgaver, hvad brugeren gjorde, ordrette kommentarer, og konkrete ændringer. Gør ikke hypotetiske observationer til faktiske resultater.

## Mulig ærlig rapportformulering, hvis interviews ikke bliver gennemført

> På grund af tidsmæssige begrænsninger blev der ikke gennemført en ny runde af empirisk brugerinddragelse. Der blev i stedet lavet to simulerede perspektivgennemgange som interne designhypoteser. De kan ikke betragtes som interviewdata, og manglende reel brugerevaluering er en væsentlig begrænsning i forhold til opgavekravene.
