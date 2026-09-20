import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

export default function BookingScreen() {
  const [facilities, setFacilities] = useState([
    {
      id: '1',
      name: 'Fælleslokale',
      description: 'Plads til cirka 30 personer',
      status: 'Ledig',
    },
    {
      id: '2',
      name: 'Gæsteværelse',
      description: 'Overnatning for gæster',
      status: 'Ledig',
    },
    {
      id: '3',
      name: 'Trailer',
      description: 'Foreningens fælles trailer',
      status: 'Optaget',
    },
  ]);

  const bookFacility = (id) => {
    setFacilities((currentFacilities) =>
      currentFacilities.map((facility) =>
        facility.id === id && facility.status === 'Ledig'
          ? { ...facility, status: 'Booket af dig' }
          : facility
      )
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Booking</Text>

      <Text style={styles.subtitle}>
        Her kan du booke foreningens fælles faciliteter.
      </Text>

      <FlatList
        data={facilities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const canBook = item.status === 'Ledig';

          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>

              <Text style={styles.cardText}>
                {item.description}
              </Text>

              <Text style={styles.statusText}>
                Status: {item.status}
              </Text>

              <TouchableOpacity
                style={[
                  styles.smallButton,
                  !canBook && styles.disabledButton,
                ]}
                disabled={!canBook}
                onPress={() => bookFacility(item.id)}
              >
                <Text style={styles.buttonText}>
                  {canBook ? 'Book' : item.status}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}