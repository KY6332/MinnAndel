# Rapportudkast / disposition — INNT Godkendelsesopgave 2

> **UDKAST, ikke en færdig afleveringsrapport.** Tilføj dine faktiske oplysninger om opgave 1, faktisk feedback, kilder og refleksioner. Påstå ikke at simulerede perspektiver er interviews. Maksimalt fem normalsider i den endelige rapport.

## 1. Introduktion til produktet

MinnAndel er en React Native-app, der samler praktiske funktioner for en andelsboligforening. I denne iteration blev første versions idé om booking og bestyrelsesoversigt videreudviklet til tre brugerroller: beboer, bestyrelse og vicevært. Formålet er at gøre foreningsinformation lettere at finde og minimere behovet for manuelle henvendelser om booking, fejlmeldinger og kontaktpersoner.

**Indsæt:** Hvad var formålet og den dokumenterede feedback fra godkendelsesopgave 1? Undgå at opfinde feedback.

## 2. Produktets ændringer (innovation, ikke detaljeret kode)

Anden iteration understøtter separate behov: Beboeren kan booke en fællesressource og indsende en fejlmelding; bestyrelsen kan oprette nyheder, opgaver, fællesfaciliteter og informationsnoter; viceværten kan opdatere status på fejlmeldinger. Alle roller har adgang til en søgbar kontaktliste og notifikationspræferencer. Fejlmeldinger kan følges af den person, der har indsendt dem.

Data bliver nu gemt i Firestore i stedet for alene at være midlertidig skærmtilstand. Indholdet er afgrænset: ingen dato-/kalenderbooking, pushbeskeder eller automatisk PDF-upload. Den gratis dokumentopslagsfunktion søger i tilgængelige dokumentnoter og er ikke en egentlig generativ AI-chatbot. En OpenAI-serverintegration findes som fremtidig mulighed.

## 3. Brugerinddragelse og metode

**Her mangler der reel empiri fra anden iteration.** Den foreliggende tekniske gennemgang og de to simulerede brugerperspektiver (`SIMULEREDE_BRUGERINDTRYK.md`) er interne designhypoteser, ikke observations- eller interviewdata.

**Indsæt hvis der foreligger reel empiri:** antal deltagere, rekruttering, metode, spørgsmål/opgaver, anonymiserede observationer, datoer, citater og begrænsninger. Opgavebeskrivelsen kræver en oprindelig brugeriteration (min. 2 interviews eller 15 surveysvar) **samt** en ny evaluering med brugere. Den simulerede analyse opfylder ikke dette krav.

## 4. Value hypothesis og markedsovervejelser

**Hypotese (skal valideres):** Når information, kontaktpersoner og fejlmeldingsstatus er samlet ét sted, vil beboere kunne gennemføre flere praktiske opgaver uden at skrive til bestyrelsen eller viceværten. For bestyrelsen kan en fælles digital kanal mindske gentagne forespørgsler, men den tilføjer også et vedligeholdelsesansvar: oplysningerne skal holdes ajour, og roller skal tildeles korrekt.

En realistisk målgruppe er mindre og mellemstore andelsboligforeninger. Adoption afhænger bl.a. af tillid til databehandling, let onboarding, adgang for mindre teknologivante beboere og om foreningen allerede bruger konkurrerende værktøjer. Disse er **antagelser**, ikke dokumenterede markedsresultater. Lean Startup kan bruges til at beskrive opbygning, måling og læring gennem iterationer, men angiv korrekte kilder fra pensum i din endelige rapport.

## 5. Refleksion over læring og næste iteration

Et centralt valg var at prioritere et fungerende minimumsprodukt frem for et stort antal avancerede features. Det gjorde det muligt at få rollebaseret login, vedvarende data, logout og dagligdags flows til at hænge sammen. En vigtig teknisk læring var, at adgangsregler i Firestore har betydning for, hvad de forskellige roller må se, og at serverbaseret AI har drifts- og omkostningskrav.

Næste iteration bør undersøge, om brugerne forstår booking uden datoer, om notifikationsindstillingerne skaber urealistiske forventninger, og om bestyrelsesmedlemmer føler sig trygge ved adgangskontrollen. Datohåndteret booking og faktiske pushnotifikationer bør først udvikles efter brugerfeedback.

**Indsæt:** Egne faktiske udfordringer, observationer fra demo, refleksioner fra læringsdagbog, hvad du selv har kodet, samt rapportens kildehenvisninger.

## 6. Links / aflevering

- GitHub: https://github.com/KY6332/MinnAndel (opdatér repo før aflevering)
- Demovideo: **[INDsæt faktisk link]**
- Rapporten skal være individuel, højst fem normalsider, med GitHub og demovideo-link.
- Vedlæg ZIP uden `node_modules`.
