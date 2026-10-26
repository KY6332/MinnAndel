import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider, useApp } from './context/AppContext';
import { colors } from './styles/theme';
import EntryScreen from './screens/EntryScreen';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import BoardScreen from './screens/BoardScreen';
import CaretakerScreen from './screens/CaretakerScreen';
import ReportScreen from './screens/ReportScreen';
import ContactsScreen from './screens/ContactsScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import ScannerScreen from './screens/ScannerScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
function MainNavigator() {
  const { user, role, loading } = useApp();
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator color={colors.primary} /></View>;
  const access = user && role;
  return <NavigationContainer>
    <Stack.Navigator key={access ? `app-${role}` : 'entry'} screenOptions={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.ink, contentStyle: { backgroundColor: colors.background } }}>
      {!access ? <Stack.Screen name="Entry" component={EntryScreen} options={{ title: 'MinnAndel' }} /> : <>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MinnAndel' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Booking' }} />
        <Stack.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Kontaktliste' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Assistent' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Lån med QR' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Indstillinger' }} />
        <Stack.Screen name="Documents" component={DocumentsScreen} options={{ title: 'Dokumenter' }} />
        {role === 'resident' && <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Fejlmelding' }} />}
        {role === 'board' && <Stack.Screen name="Board" component={BoardScreen} options={{ title: 'Bestyrelsen' }} />}
        {(role === 'board' || role === 'caretaker') && <Stack.Screen name="Caretaker" component={CaretakerScreen} options={{ title: 'Vedligeholdelse' }} />}
      </>}
    </Stack.Navigator>
  </NavigationContainer>;
}
export default function App() {
  return <AppProvider><StatusBar style="dark" /><MainNavigator /></AppProvider>;
}
