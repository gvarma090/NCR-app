import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

const API_URL = "http://100.52.126.162:4000";

export default function CustomerHome({ route }: any) {
  const { phone } = route.params;

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] =
    useState<"BIKE" | "AUTO" | "CAB" | null>(null);
  const [loading, setLoading] = useState(false);

  const fareMap = {
    BIKE: 80,
    AUTO: 120,
    CAB: 200
  };

  const bookRide = async () => {
    if (!source || !destination || !vehicleType) {
      Alert.alert("Error", "Pickup, Drop and Vehicle are required");
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
          vehicleType,
          fare: fareMap[vehicleType]
        })
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Failed", data.message || "Ride failed");
        return;
      }

      Alert.alert(
        "Ride Booked",
        `Searching ${vehicleType} driver`
      );

      // reset
      setSource("");
      setDestination("");
      setVehicleType(null);
    } catch (e) {
      Alert.alert("Error", "Backend unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Ride</Text>

      <TextInput
        placeholder="Pickup location"
        style={styles.input}
        value={source}
        onChangeText={setSource}
      />

      <TextInput
        placeholder="Drop location"
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />

      <View style={styles.row}>
        {["BIKE", "AUTO", "CAB"].map(v => (
          <TouchableOpacity
            key={v}
            style={[
              styles.vehicle,
              vehicleType === v && styles.active
            ]}
            onPress={() => setVehicleType(v as any)}
          >
            <Text>{v}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {vehicleType && (
        <Text style={styles.fare}>
          Fare: ₹{fareMap[vehicleType]}
        </Text>
      )}

      <TouchableOpacity
        style={styles.book}
        onPress={bookRide}
        disabled={loading}
      >
        <Text style={styles.bookText}>
          {loading ? "Booking..." : "Book Ride"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },
  row: { flexDirection: "row", marginBottom: 16 },
  vehicle: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 10
  },
  active: {
    backgroundColor: "#dbeafe",
    borderColor: "#2563eb"
  },
  fare: {
    fontSize: 18,
    marginBottom: 14,
    fontWeight: "600"
  },
  book: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 14
  },
  bookText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  }
});

