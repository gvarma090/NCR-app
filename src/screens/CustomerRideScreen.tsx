import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import AppButton from "../components/AppButton";

const API_URL = "http://100.52.126.162:4000";

export default function CustomerRideScreen({ route }: any) {
  const phone = route?.params?.phone;

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [vehicleType, setVehicleType] = useState("BIKE");
  const [loading, setLoading] = useState(false);

  const requestRide = async () => {
    if (!source || !destination || !fare) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/rides/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerPhone: phone,
          source,
          destination,
          fare: Number(fare),
          vehicleType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data?.message || "Request failed");
        return;
      }

      Alert.alert("Success", "Ride requested successfully");
      setSource("");
      setDestination("");
      setFare("");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Backend unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚖 Request Ride</Text>

      <TextInput
        style={styles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        style={styles.input}
        placeholder="Fare"
        keyboardType="numeric"
        value={fare}
        onChangeText={setFare}
      />

      <Text style={styles.label}>Vehicle Type</Text>

      <View style={styles.row}>
        {["BIKE", "AUTO", "CAB"].map((type) => (
          <AppButton
            key={type}
            title={type}
            onPress={() => setVehicleType(type)}
            variant={vehicleType === type ? "primary" : "secondary"}
          />
        ))}
      </View>

      <AppButton
        title={loading ? "Requesting..." : "Request Ride"}
        onPress={requestRide}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  label: { fontSize: 16, marginBottom: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

