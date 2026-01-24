import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import DriverStack from './DriverStack';
import CustomerStack from './CustomerStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Phase 3: Always start with Auth */}
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="DriverStack" component={DriverStack} />
      <Stack.Screen name="CustomerStack" component={CustomerStack} />
    </Stack.Navigator>
  );
}

