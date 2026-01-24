import React from 'react';
import { View, Text, Button } from 'react-native';

export default function CustomerActiveRideScreen({ navigation }: any) {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Ride in Progress
      </Text>

      <Button
        title="Complete Ride"
        onPress={() => navigation.replace('RideCompleted')}
      />
    </View>
  );
}

