import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RoleSelectScreen({ route, navigation }: any) {
  const { phone } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>

      {/* CUSTOMER */}
      <TouchableOpacity
        style={[styles.card, styles.customer]}
        onPress={() =>
          navigation.navigate("CustomerPlan", { phone })
        }
      >
        <Text style={styles.text}>Continue as Customer</Text>
      </TouchableOpacity>

      {/* DRIVER */}
      <TouchableOpacity
        style={[styles.card, styles.driver]}
        onPress={() =>
          navigation.navigate("VehicleSelect", { phone })

        }
      >
        <Text style={styles.text}>Continue as Driver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  customer: {
    backgroundColor: "#2563eb",
  },
  driver: {
    backgroundColor: "#16a34a",
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
});

