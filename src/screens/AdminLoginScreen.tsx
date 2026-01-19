import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AdminLoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠️ Admin Panel</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("AdminDashboard")}
      >
        <Text style={styles.buttonText}>Enter Admin Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 40
  },
  button: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700"
  }
});

