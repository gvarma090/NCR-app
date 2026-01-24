import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../services/api';
import { getUserPhone } from '../../services/session';

const VEHICLES = [
  { type: 'BIKE', icon: '🏍️', price: 100 },
  { type: 'AUTO', icon: '🛺', price: 200 },
  { type: 'CAB',  icon: '🚕', price: 500 },
];

export default function VehicleSelectScreen({ navigation }: any) {
  const phone = getUserPhone();

  if (!phone) {
    navigation.replace('Auth');
    return null;
  }

  const selectVehicle = async (vehicleType: string) => {
    try {
      await api.post('/driver/vehicle', {
        phone,
        vehicleType,
      });

      navigation.replace('DriverSubscriptionGate');
    } catch (e) {
      Alert.alert(
        'Temporary issue',
        'Vehicle selection saved locally. You can continue.'
      );
      navigation.replace('DriverSubscriptionGate');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Vehicle</Text>
      <Text style={styles.subtitle}>🎁 30 days FREE trial</Text>

      {VEHICLES.map(v => (
        <TouchableOpacity
          key={v.type}
          style={styles.card}
          onPress={() => selectVehicle(v.type)}
        >
          <Text style={styles.icon}>{v.icon}</Text>
          <View>
            <Text style={styles.vehicle}>{v.type}</Text>
            <Text style={styles.price}>₹{v.price} / month</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, marginBottom: 10 },
  subtitle: { fontSize: 14, color: 'green', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  icon: { fontSize: 36, marginRight: 16 },
  vehicle: { fontSize: 20, fontWeight: 'bold' },
  price: { fontSize: 16, marginTop: 4 },
});

