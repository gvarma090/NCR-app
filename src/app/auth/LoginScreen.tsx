import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');

  const handleSendOtp = () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit mobile number');
      return;
    }

    navigation.navigate('Otp', { phone });
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, textAlign: 'center', marginBottom: 30 }}>
        NCR
      </Text>

      <TextInput
        placeholder="Enter mobile number"
        keyboardType="number-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 16,
          fontSize: 18,
          marginBottom: 20,
        }}
      />

      <Button title="Send OTP" onPress={handleSendOtp} />
    </View>
  );
}

