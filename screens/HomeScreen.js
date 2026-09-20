import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

const news = [
  {
    id: '1',
    title: 'Vandet lukkes tirsdag',
    description: 'Vandet er lukket mellem kl. 10:00 og 12:00.',
  },
  {
    id: '2',
    title: 'Generalforsamling',
    description: 'Årets generalforsamling afholdes den 4. oktober.',
  },
  {
    id: '3',
    title: 'Fælleslokalet',
    description: 'Der er kommet nye regler for brug af fælleslokalet.',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Velkommen 👋</Text>

      <Text style={styles.subtitle}>
        Andelsboligforeningen Solgården
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Booking')}
      >
        <Text style={styles.buttonText}>Book fælles ting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Board')}
      >
        <Text style={styles.buttonText}>Bestyrelsen</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Seneste nyt</Text>

      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}