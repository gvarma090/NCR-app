import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoleSelectScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NCR</Text>
      <Text style={styles.subtitle}>Choose how you want to continue</Text>

      <TouchableOpacity
        style={[styles.card, styles.customer]}
        onPress={() => navigation.replace('CustomerStack')}
      >
        <Text style={styles.cardTitle}>🚕 Continue as Customer</Text>
        <Text style={styles.cardSub}>Book rides at fair prices</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.driver]}
        onPress={() => navigation.replace('DriverStack')}
      >
        <Text style={styles.cardTitle}>🛵 Continue as Driver</Text>
        <Text style={styles.cardSub}>Earn with full transparency</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 40,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  customer: {
    backgroundColor: '#E3F2FD',
  },
  driver: {
    backgroundColor: '#E8F5E9',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSub: {
    fontSize: 13,
    marginTop: 6,
    color: '#555',
  },
});

