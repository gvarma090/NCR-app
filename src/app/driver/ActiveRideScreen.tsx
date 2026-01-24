import React from 'react';
import { View, Text, Button } from 'react-native';
import api from '../../services/api';
import useDisableBack from '../../hooks/useDisableBack';
import { getUserId } from '../../services/session';

export default function ActiveRideScreen({ navigation, route }: any) {
  useDisableBack();

  // 🔒 rideId MUST exist
  const { rideId } = route.params;
  getUserId(); // validate session

  const completeRide = async () => {
    await api.post('/rides/complete', { rideId });
    navigation.replace('DriverHome');
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20 }}>Ride in progress</Text>
      <Text style={{ marginVertical: 10 }}>Ride ID: {rideId}</Text>

      <Button title="Complete Ride" onPress={completeRide} />
    </View>
  );
}

