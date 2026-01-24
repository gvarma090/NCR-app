import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DriverHomeScreen({ navigation, route }: any) {
  const { userId } = route.params;

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24 }}>Driver Home</Text>

      <Button
        title="Go Online (View Pending Rides)"
        onPress={() => navigation.navigate('DriverPendingRides', { userId })}
      />
    </View>
  );
}

