import React, { useState } from 'react';
import { Page, Title, Sub, Section, Card, Button, Field, Heading, Muted, ErrorText, Badge } from '../components/UI';
import { httpsCallable } from 'firebase/functions';
import { useApp } from '../context/AppContext';
import { cloudFunctions } from '../services/firebase';
import { answerFromNotes } from '../services/knowledge';
import useEntries from '../hooks/useEntries';

const AI_ENABLED = process.env.EXPO_PUBLIC_AI_ENABLED === 'true';
const WELCOME = { id: 'intro', sender: 'assistant', text: 'Hej! Spørg om foreningens dokumenter, praktiske regler og offentliggjorte oplysninger.' };
export default function ChatScreen() {
  const { demo } = useApp();
  const { items: documents, error: documentsError } = useEntries('documents');
  const [messages, setMessages] = useState([WELCOME]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const [notice, setNotice] = useState('');

  async function send() {
    const question = draft.trim();
    if (!question || busy) return;
    setDraft(''); setBusy(true); setNotice('');
    setMessages(old => [...old, { id: `${Date.now()}-user`, sender: 'user', text: question }]);
    try {
      let answer;
      let source = 'Dokumentopslag · ikke AI';
      if (!demo && AI_ENABLED && !aiUnavailable && cloudFunctions) {
        try {
          const ask = httpsCallable(cloudFunctions, 'askAssociation');
          const result = await ask({ question });
          answer = result.data?.answer;
          if (!answer) throw new Error('Tomt svar');
          source = 'OpenAI · dokumentbaseret';
        } catch (error) {
          // Firebase Functions kan kræve Blaze. Hold basisfunktionen brugbar uden betaling.
          setAiUnavailable(true);
          setNotice('AI-serveren er ikke tilgængelig. Vi viser et lokalt opslag i de dokumenter, du har adgang til.');
        }
      }
      if (!answer) answer = answerFromNotes(question, documents);
      setMessages(old => [...old, { id: `${Date.now()}-answer`, sender: 'assistant', text: answer, source }]);
    } finally { setBusy(false); }
  }
  return <Page>
    <Title>Spørg MinnAndel ✦</Title>
    <Sub>Få hjælp ud fra de oplysninger, som bestyrelsen har offentliggjort.</Sub>
    <Card><Badge>{demo || aiUnavailable || !AI_ENABLED ? 'Dokumentopslag (gratis)' : 'AI-assistent aktiveret'}</Badge>
      <Muted>Uden deployet AI-server bruges søgning i dine tilladte dokumentnoter. Det er ikke et AI-genereret svar.</Muted></Card>
    <ErrorText>{documentsError}</ErrorText>
    {notice ? <Card><Muted>{notice}</Muted></Card> : null}
    {messages.map(msg => <Card key={msg.id}>
      <Heading>{msg.sender === 'user' ? 'Dig' : '✦ MinnAndel'}</Heading>
      {msg.source ? <Badge>{msg.source}</Badge> : null}
      <Muted>{msg.text}</Muted>
    </Card>)}
    <Section>Dit spørgsmål</Section>
    <Field label="Spørg om et dokument" value={draft} onChangeText={setDraft} multiline placeholder="Fx Hvad står der i regnskabet for 2025?" />
    <Button title="Send spørgsmål" onPress={send} disabled={!draft.trim() || Boolean(documentsError)} loading={busy} />
    <Muted>Indtast ikke CPR-numre eller andre følsomme oplysninger. AI-svar kan indeholde fejl. Kontrollér mod originaldokumenterne.</Muted>
  </Page>;
}
