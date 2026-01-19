import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import RoleSelectScreen from "./src/screens/RoleSelectScreen";

import CustomerPlanScreen from "./src/screens/CustomerPlanScreen";
import CustomerHome from "./src/screens/CustomerHome";

import VehicleSelectScreen from "./src/screens/VehicleSelectScreen";
import DriverHomeScreen from "./src/screens/DriverHomeScreen";
import DriverPendingRidesScreen from "./src/screens/DriverPendingRidesScreen";
import AdminDriverControlScreen from "./src/screens/AdminDriverControlScreen";
import DriverActiveRideScreen from "./src/screens/DriverActiveRideScreen";
import AdminLoginScreen from "./src/screens/AdminLoginScreen";
import AdminDashboardScreen from "./src/screens/AdminDashboardScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />

        {/* CUSTOMER */}
        <Stack.Screen name="CustomerPlan" component={CustomerPlanScreen} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} />

        {/* DRIVER */}
        <Stack.Screen name="VehicleSelect" component={VehicleSelectScreen} />
        <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
	<Stack.Screen name="PendingRides" component={DriverPendingRidesScreen} />
	<Stack.Screen name="AdminDrivers" component={AdminDriverControlScreen} />
	<Stack.Screen name="DriverActiveRide" component={DriverActiveRideScreen} />
	<Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

