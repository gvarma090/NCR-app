import React from 'react';
import { View, Text, Button } from 'react-native';

export default function RideCompletedScreen({ navigation }: any) {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Ride Completed 🎉
      </Text>

      <Button
        title="Go Home"
        onPress={() => navigation.replace('CustomerHome')}
      />
    </View>
  );
}

