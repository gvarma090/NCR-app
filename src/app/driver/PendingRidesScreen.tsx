import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import api from '../../services/api';

export default function PendingRidesScreen({ navigation, route }: any) {
  const { userId } = route.params;
  const [rides, setRides] = useState([]);

  useEffect(() => {
    loadRides();
  }, []);

  const loadRides = async () => {
    const res = await api.get(`/rides/pending?userId=${userId}`);
    setRides(res.data);
  };

  const acceptRide = async (rideId: number) => {
    await api.post('/rides/accept', {
      rideId,
      driverUserId: userId,
    });

    navigation.replace('DriverOtp', { rideId, userId });
  };

  return (
    <FlatList
      data={rides}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }: any) => (
        <View style={{ padding: 16, borderBottomWidth: 1 }}>
          <Text>{item.source} → {item.destination}</Text>
          <Text>₹{item.estimated_price}</Text>
          <Button title="Accept" onPress={() => acceptRide(item.id)} />
        </View>
      )}
    />
  );
}

