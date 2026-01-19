import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";

const API_URL = "http://100.52.126.162:4000";

export default function DriverActiveRideScreen({ route, navigation }: any) {
  const phone = route?.params?.phone;

  const [ride, setRide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const timerRef = useRef<any>(null);
  const mountedRef = useRef(true);

  /* =========================
     CLEANUP ON UNMOUNT
  ========================= */
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  /* =========================
     LOAD ACTIVE RIDE
  ========================= */
  const loadRide = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/rides/active/${phone}`);
      const data = await res.json();

      if (!mountedRef.current) return;
      setRide(data || null);
    } catch {
      Alert.alert("Error", "Failed to load active ride");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    if (phone) loadRide();
  }, [phone]);

  /* =========================
     CANCEL TIMER (60s)
  ========================= */
  useEffect(() => {
    if (
      !ride ||
      ride.status !== "ACCEPTED" ||
      !ride.accepted_at
    ) {
      setSecondsLeft(null);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      const diff =
        60 -
        Math.floor(
          (Date.now() - new Date(ride.accepted_at).getTime()) / 1000
        );

      if (!mountedRef.current) return;

      setSecondsLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [ride]);

  /* =========================
     SAFE NAVIGATION RESET
  ========================= */
  const goToPending = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    navigation.reset({
      index: 0,
      routes: [
        { name: "DriverHome", params: { phone } },
      ],
    });
  };

  /* =========================
     ACTIONS
  ========================= */

  const cancelRide = async () => {
    if (!ride?.id) return;

    try {
      const res = await fetch(`${API_URL}/api/rides/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ride.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Cancel failed", data?.message || "Not allowed");
        return;
      }

      Alert.alert("Ride cancelled");
      goToPending();
    } catch {
      Alert.alert("Error", "Cancel failed");
    }
  };

  const startRide = async () => {
    if (!ride?.id) return;

    try {
      const res = await fetch(`${API_URL}/api/rides/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ride.id }),
      });

      if (!res.ok) {
        Alert.alert("Error", "Cannot start ride");
        return;
      }

      loadRide();
    } catch {
      Alert.alert("Error", "Start failed");
    }
  };

  const completeRide = async () => {
    if (!ride?.id) return;

    try {
      const res = await fetch(`${API_URL}/api/rides/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ride.id }),
      });

      if (!res.ok) {
        Alert.alert("Error", "Cannot complete ride");
        return;
      }

      Alert.alert("Ride completed");
      goToPending();
    } catch {
      Alert.alert("Error", "Complete failed");
    }
  };

  /* =========================
     UI STATES
  ========================= */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading ride...</Text>
      </View>
    );
  }

  if (!ride) {
    return (
      <View style={styles.center}>
        <Text>No active ride</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚕 Active Ride</Text>

      <Text style={styles.route}>
        {ride.source} → {ride.destination}
      </Text>

      <Text>📞 {ride.customer_phone}</Text>
      <Text>💰 ₹{ride.fare}</Text>

      {ride.status === "ACCEPTED" && (
        <>
          {secondsLeft !== null && secondsLeft > 0 && (
            <Text style={styles.timer}>
              ⏱ Cancel available for {secondsLeft}s
            </Text>
          )}

          <TouchableOpacity style={styles.start} onPress={startRide}>
            <Text style={styles.btnText}>Start Ride</Text>
          </TouchableOpacity>

          {secondsLeft !== null && secondsLeft > 0 && (
            <TouchableOpacity style={styles.cancel} onPress={cancelRide}>
              <Text style={styles.btnText}>Cancel Ride</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {ride.status === "ONGOING" && (
        <TouchableOpacity style={styles.complete} onPress={completeRide}>
          <Text style={styles.btnText}>Complete Ride</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  route: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  timer: { color: "#b45309", marginTop: 10 },
  start: {
    marginTop: 16,
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancel: {
    marginTop: 10,
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  complete: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

