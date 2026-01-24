import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { setUserPhone } from '../../services/session';

export default function OtpScreen({ route, navigation }: any) {
  const phone = route?.params?.phone;
  const [otp, setOtp] = useState('');

  if (!phone) {
    return <Text>Invalid login flow</Text>;
  }

  const verifyOtp = () => {
    if (!/^[0-9]{4,6}$/.test(otp)) {
      Alert.alert('Invalid OTP');
      return;
    }

    // ✅ SAVE SESSION
    setUserPhone(phone);

    navigation.replace('RoleSelect');
  };

  return (
    <View style={{ padding: 24 }}>
      <Text>OTP sent to {phone}</Text>

      <TextInput
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
        style={{ borderWidth: 1, padding: 12, marginVertical: 20 }}
      />

      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}

