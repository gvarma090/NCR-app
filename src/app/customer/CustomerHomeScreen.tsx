import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomerHomeScreen({ route }: any) {
  const plan = route?.params?.plan || 'FREE';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Ride</Text>

      <Text style={styles.planText}>
        Your Plan: <Text style={styles.planValue}>{plan}</Text>
      </Text>

      <TextInput
        placeholder="Pickup location"
        placeholderTextColor="#000"
        style={styles.input}
      />

      <TextInput
        placeholder="Drop location"
        placeholderTextColor="#000"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Vehicle selection & pricing coming next
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  planText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  planValue: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#000', // ✅ TEXT IS BLACK
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
  },
});

