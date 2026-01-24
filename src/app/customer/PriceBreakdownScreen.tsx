import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PriceBreakdownScreen({ navigation }: any) {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Price Breakdown
      </Text>

      <Text>Estimated Fare: ₹120</Text>

      <Button
        title="Request Ride"
        onPress={() => navigation.navigate('WaitingDriver')}
      />
    </View>
  );
}

