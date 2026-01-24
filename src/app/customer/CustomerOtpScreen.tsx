import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function CustomerOtpScreen({ navigation }: any) {
  const [otp, setOtp] = useState('');

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20 }}>
        Enter Ride OTP
      </Text>

      <TextInput
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
        style={{
          borderWidth: 1,
          padding: 12,
          marginVertical: 20,
        }}
      />

      <Button
        title="Start Ride"
        onPress={() => navigation.replace('CustomerActiveRide')}
      />
    </View>
  );
}

