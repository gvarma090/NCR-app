import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import AppButton from "../components/AppButton";

const API_URL = "http://100.52.126.162:4000";

export default function DriverPendingRidesScreen({ route, navigation }: any) {
  const phone = route?.params?.phone;

  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  const previousIdsRef = useRef<number[]>([]);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 🔄 Fetch pending rides
  const fetchPendingRides = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/rides/pending?phone=${phone}`
      );
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];

      // 🔔 Detect new ride
      const newIds = list.map((r: any) => r.id);
      const hasNewRide = newIds.some(
        (id: number) => !previousIdsRef.current.includes(id)
      );

      if (hasNewRide && previousIdsRef.current.length > 0) {
        setShowBanner(true);
        if (bannerTimerRef.current) {
          clearTimeout(bannerTimerRef.current);
        }
        bannerTimerRef.current = setTimeout(() => {
          setShowBanner(false);
        }, 3000);
      }

      previousIdsRef.current = newIds;
      setRides(list);
    } catch {
      Alert.alert("Error", "Failed to load pending rides");
    } finally {
      setLoading(false);
    }
  };

  // ⏱ Auto-refresh (SAFE)
  useEffect(() => {
    if (!phone) return;

    fetchPendingRides();
    const interval = setInterval(fetchPendingRides, 5000);

    return () => {
      clearInterval(interval);
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, [phone]);

  const acceptRide = async (rideId: number) => {
    try {
      const res = await fetch(`${API_URL}/api/rides/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: rideId,
          driverPhone: phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Cannot accept ride", data?.message || "Error");
        return;
      }

      navigation.replace("DriverActiveRide", { phone });
    } catch {
      Alert.alert("Error", "Backend unreachable");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading pending rides...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showBanner && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>🚕 New ride available</Text>
        </View>
      )}

      <Text style={styles.title}>🚕 Pending Rides</Text>

      {rides.length === 0 ? (
        <View style={styles.center}>
          <Text>No pending rides</Text>
        </View>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isNew = !previousIdsRef.current.includes(item.id);

            return (
              <View
                style={[
                  styles.card,
                  isNew && styles.newCard,
                ]}
              >
                <Text style={styles.route}>
                  {item.source} ➝ {item.destination}
                </Text>
                <Text>📞 {item.customer_phone}</Text>
                <Text>💰 ₹{item.fare}</Text>
                <Text>🚘 {item.vehicle_type}</Text>

                <AppButton
                  title="Accept Ride"
                  onPress={() => acceptRide(item.id)}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },

  banner: {
    backgroundColor: "#dcfce7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  bannerText: {
    color: "#166534",
    fontWeight: "700",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  newCard: {
    borderWidth: 2,
    borderColor: "#22c55e",
    backgroundColor: "#ecfdf5",
  },

  route: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

