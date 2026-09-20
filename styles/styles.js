import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  cardText: {
    fontSize: 14,
    color: '#555',
  },

  primaryButton: {
    backgroundColor: '#2f6fed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  secondaryButton: {
    backgroundColor: '#4c5b70',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  smallButton: {
    backgroundColor: '#2f6fed',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  disabledButton: {
    backgroundColor: '#999',
  },

  statusText: {
    marginTop: 10,
    fontWeight: 'bold',
  },

  infoBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
});

export default styles;