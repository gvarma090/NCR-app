import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { getPhone } from '../../services/session';

export default function SubscriptionGateScreen({ navigation }: any) {
  const phone = getPhone();

  useEffect(() => {
    if (!phone) {
      navigation.replace('Auth');
      return;
    }

    check();
  }, []);

  const check = async () => {
    try {
      await api.get(`/admin/driver/access/${phone}`);
    } catch (e) {
      // ignore — allow trial
    }

    navigation.replace('DriverHome');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Checking subscription…</Text>
    </View>
  );
}

