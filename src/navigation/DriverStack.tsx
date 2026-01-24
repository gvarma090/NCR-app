import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VehicleSelectScreen from '../app/driver/VehicleSelectScreen';
import SubscriptionGateScreen from '../app/driver/SubscriptionGateScreen';
import DriverHomeScreen from '../app/driver/DriverHomeScreen';
import PendingRidesScreen from '../app/driver/PendingRidesScreen';
import DriverOtpScreen from '../app/driver/DriverOtpScreen';
import ActiveRideScreen from '../app/driver/ActiveRideScreen';

const Stack = createNativeStackNavigator();

export default function DriverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverVehicle" component={VehicleSelectScreen} />
      <Stack.Screen name="DriverSubscriptionGate" component={SubscriptionGateScreen} />
      <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
      <Stack.Screen name="DriverPendingRides" component={PendingRidesScreen} />
      <Stack.Screen name="DriverOtp" component={DriverOtpScreen} />
      <Stack.Screen name="DriverActiveRide" component={ActiveRideScreen} />
    </Stack.Navigator>
  );
}

