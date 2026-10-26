import React, { useState, useRef } from 'react';
import { Alert, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Page, Title, Sub, Section, Card, Button, Heading, Muted, Badge, ErrorText } from '../components/UI';
import { useApp } from '../context/AppContext';
import useEntries from '../hooks/useEntries';
import { readEquipmentQR, toggleEquipment } from '../services/store';

export default function ScannerScreen() {
  const { user, demo, role } = useApp();
  const { items, error, refresh } = useEntries('equipment');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [busy, setBusy] = useState(false);
  const scanLock = useRef(false);

  async function scanData(raw) {
    if (scanLock.current) return;
    scanLock.current = true;
    setBusy(true);
    setScanning(false);
    try {
      const id = readEquipmentQR(raw);
      if (!id) throw new Error('Dette er ikke en gyldig MinnAndel-udstyrs-QR-kode.');
      const result = await toggleEquipment(id, user.uid, demo);
      refresh();
      Alert.alert('Registreret', result);
    } catch (e) { Alert.alert('QR-scanning', e.message); }
    finally { setBusy(false); scanLock.current = false; }
  }
  async function startScanner() {
    if (!permission?.granted) {
      const response = await requestPermission();
      if (!response.granted) { Alert.alert('Kamera', 'Giv adgang til kameraet for at scanne QR-koder.'); return; }
    }
    setScanning(true);
  }
  return <Page>
    <Title>Fælles udstyr</Title>
    <Sub>Scan QR-koden på en genstand for at registrere et lån eller en aflevering.</Sub>
    <Button title={scanning ? 'Luk kamera' : 'Åbn QR-scanner'} onPress={scanning ? () => setScanning(false) : startScanner} disabled={busy} />
    {scanning && <View style={{ height: 290, borderRadius: 14, overflow: 'hidden' }}>
      <CameraView style={{ flex: 1 }} facing="back" barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={({ data }) => scanData(data)} />
    </View>}
    <Section>Udstyrsoversigt</Section><ErrorText>{error}</ErrorText>
    {items.length === 0 && <Muted>Intet udstyr registreret. Bestyrelsen skal oprette det i Firestore.</Muted>}
    {items.map(item => <Card key={item.id}>
      <Heading>{item.name}</Heading><Muted>{item.description}</Muted>
      <Badge>{item.status === 'available' ? 'Ledig' : item.borrowerId === user.uid ? 'Lånt af dig' : 'Udlånt'}</Badge>
      {demo && <Button title={item.borrowerId === user.uid ? 'Simuler aflevering' : 'Simuler QR-scanning'} disabled={busy || (item.status !== 'available' && item.borrowerId !== user.uid)} onPress={() => scanData(`minnandel:item:${item.id}`)} secondary />}
    </Card>)}
    <Muted>QR-format til mærkater: minnandel:item:drill01 (udskift med genstandens ID). Kameraet virker på en rigtig telefon. I demo kan du også simulere scanning.</Muted>
  </Page>;
}
