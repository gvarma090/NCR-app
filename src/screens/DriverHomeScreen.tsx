import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppButton from "../components/AppButton";

const API_URL = "http://100.52.126.162:4000";

export default function DriverHomeScreen({ route, navigation }: any) {
  const phone = route?.params?.phone;

  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState<boolean | null>(null);

  const checkState = async () => {
    try {
      setLoading(true);

      /* 🔒 SINGLE SOURCE OF TRUTH
         Only ACCEPTED / ONGOING are active
      */
      const activeRes = await fetch(
        `${API_URL}/api/rides/active/${phone}`
      );
      const activeRide = await activeRes.json();

      if (
        activeRide &&
        activeRide.id &&
        (activeRide.status === "ACCEPTED" ||
         activeRide.status === "ONGOING")
      ) {
        navigation.replace("DriverActiveRide", { phone });
        return;
      }

      // ✅ Check approval
      const res = await fetch(
        `${API_URL}/api/admin/drivers?status=APPROVED`
      );
      const drivers = await res.json();
      setApproved(drivers.some((d: any) => d.phone === phone));
    } catch {
      setApproved(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Run check ONLY when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (phone) checkState();
    }, [phone])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!approved) {
    return (
      <View style={styles.center}>
        <Text style={styles.wait}>
          ⏳ Waiting for admin approval
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Dashboard</Text>

      <AppButton
        title="View Pending Rides"
        onPress={() =>
          navigation.navigate("PendingRides", { phone })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  wait: { fontSize: 16, color: "#6b7280" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

