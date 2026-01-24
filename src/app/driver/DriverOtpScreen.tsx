import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../../services/api';
import useDisableBack from '../../hooks/useDisableBack';
import { getUserId } from '../../services/session';

export default function DriverOtpScreen({ navigation, route }: any) {
  useDisableBack();

  // 🔒 rideId MUST exist
  const { rideId } = route.params;
  getUserId(); // ensures user session exists

  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const verifyOtp = async () => {
    await api.post('/rides/otp/verify', { rideId });

    // ✅ PASS rideId EXPLICITLY
    navigation.replace('DriverActiveRide', { rideId });
  };

  const cancelRide = async () => {
    await api.post('/rides/cancel', { rideId });
    navigation.replace('DriverHome');
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18 }}>Enter Ride OTP</Text>

      <TextInput
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        style={{ borderWidth: 1, marginVertical: 20, padding: 12 }}
      />

      <Button title="Start Ride" onPress={verifyOtp} />

      {secondsLeft > 0 && (
        <>
          <Text style={{ marginTop: 20, color: 'red' }}>
            Cancel available for {secondsLeft}s
          </Text>
          <Button title="Cancel Ride" color="red" onPress={cancelRide} />
        </>
      )}
    </View>
  );
}

