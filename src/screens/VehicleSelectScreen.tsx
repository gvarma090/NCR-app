import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const API_URL = "http://100.52.126.162:4000";

export default function VehicleSelectScreen({ navigation, route }: any) {
  const { phone } = route.params;

  const selectVehicle = async (vehicleType: string) => {
    try {
      // 🔐 Create / login driver with vehicle
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          role: "DRIVER",
          vehicleType,
        }),
      });

      const data = await res.json();

      // 🚫 Backend error
      if (data.message) {
        Alert.alert("Error", data.message);
        return;
      }

      // ✅ GO DIRECTLY TO DRIVER HOME
      navigation.replace("DriverHome", {
        phone,
        vehicleType,
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Backend unreachable");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Vehicle</Text>

      {/* BIKE */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => selectVehicle("BIKE")}
      >
        <Text style={styles.icon}>🏍️</Text>
        <View>
          <Text style={styles.name}>Bike</Text>
          <Text style={styles.price}>₹100 / month</Text>
          <Text style={styles.trial}>15 days free trial</Text>
        </View>
      </TouchableOpacity>

      {/* AUTO */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => selectVehicle("AUTO")}
      >
        <Text style={styles.icon}>🛺</Text>
        <View>
          <Text style={styles.name}>Auto</Text>
          <Text style={styles.price}>₹150 / month</Text>
          <Text style={styles.trial}>15 days free trial</Text>
        </View>
      </TouchableOpacity>

      {/* CAB */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => selectVehicle("CAB")}
      >
        <Text style={styles.icon}>🚕</Text>
        <View>
          <Text style={styles.name}>Cab</Text>
          <Text style={styles.price}>₹300 / month</Text>
          <Text style={styles.trial}>15 days free trial</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#f8fafc",
    marginBottom: 16,
  },
  icon: {
    fontSize: 36,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  price: {
    fontSize: 16,
    color: "#2563eb",
    marginTop: 4,
  },
  trial: {
    fontSize: 14,
    color: "#16a34a",
    marginTop: 2,
  },
});

