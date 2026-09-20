import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

export default function BoardScreen() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Indhent tilbud på nye vinduer',
      done: false,
    },
    {
      id: '2',
      title: 'Bestil container',
      done: false,
    },
    {
      id: '3',
      title: 'Forbered generalforsamling',
      done: false,
    },
  ]);

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Bestyrelsen</Text>

      <View style={styles.infoBox}>
        <Text style={styles.cardTitle}>
          Næste bestyrelsesmøde
        </Text>

        <Text style={styles.cardText}>
          24. september kl. 19:00
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Bestyrelsens opgaver
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text
              style={[
                styles.cardTitle,
                item.done && styles.completedText,
              ]}
            >
              {item.title}
            </Text>

            <Text style={styles.cardText}>
              {item.done ? 'Færdig ✓' : 'Ikke færdig'}
            </Text>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.buttonText}>
                {item.done
                  ? 'Marker som ikke færdig'
                  : 'Marker som færdig'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}