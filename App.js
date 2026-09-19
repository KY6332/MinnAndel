import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import BoardScreen from './screens/BoardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'MinAndel',
            }}
          />

          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{
              title: 'Booking',
            }}
          />

          <Stack.Screen
            name="Board"
            component={BoardScreen}
            options={{
              title: 'Bestyrelsen',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}