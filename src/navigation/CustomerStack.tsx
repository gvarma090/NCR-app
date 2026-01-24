import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerPlanScreen from '../app/customer/CustomerPlanScreen';
import CustomerHomeScreen from '../app/customer/CustomerHomeScreen';

const Stack = createNativeStackNavigator();

export default function CustomerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerPlan" component={CustomerPlanScreen} />
      <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
    </Stack.Navigator>
  );
}

