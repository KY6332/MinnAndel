// Et gratis, lokalt dokumentopslag. Det er IKKE en AI-model eller en erstatning
// for serverbaseret OpenAI. Kun dokumenter, som brugerens Firestore-regler
// allerede gav adgang til, må sendes hertil.
const stopwords = new Set(['hvad', 'hvilke', 'hvilken', 'hvordan', 'hvor', 'hvem', 'jeg', 'der', 'det', 'den', 'har', 'for', 'som', 'fra', 'med', 'til', 'kan', 'vores', 'mine', 'om', 'på', 'er', 'og', 'blev', 'blevet', 'brugt', 'brugte', 'år', 'sidste']);
function tokens(value) {
  return [...new Set(String(value || '').toLocaleLowerCase('da').split(/[^\p{L}\p{N}]+/u).filter(x => x.length >= 3 && !stopwords.has(x)))];
}
export function answerFromNotes(question, documents) {
  const words = tokens(question);
  const ranked = (Array.isArray(documents) ? documents : [])
    .filter(d => d.published === true)
    .map(d => {
      const titleTokens = tokens(d.title);
      const textTokens = tokens(`${d.category || ''} ${d.content || ''}`);
      const score = words.reduce((sum, w) => sum + (titleTokens.includes(w) ? 4 : 0) + (textTokens.includes(w) ? 1 : 0), 0);
      return { d, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
  if (!ranked.length) return 'Jeg fandt ingen relevante oplysninger i de dokumentnoter, du har adgang til. Spørg bestyrelsen, hvis informationen mangler.';
  return ranked.map(({ d }) => `Kilde: ${d.title || 'Dokument'}\n${String(d.content || '').slice(0, 1300)}`).join('\n\n—\n\n') + '\n\nBemærk: Dette er et uddrag fra dokumenter, ikke et genereret AI-svar. Kontrollér altid originalen.';
}
