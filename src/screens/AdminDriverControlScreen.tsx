import React, { useEffect, useState } from "react";
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

export default function AdminDriverControlScreen() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/admin/drivers`);
      const data = await res.json();
      setDrivers(data || []);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  const approveDriver = async (phone: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/admin/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Driver approved");
        fetchDrivers();
      } else {
        Alert.alert("Error", data.message || "Approval failed");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Server not reachable");
    }
  };

  const renderDriver = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.phone}>📱 {item.phone}</Text>
      <Text style={styles.meta}>Vehicle: {item.vehicleType}</Text>
      <Text
        style={[
          styles.status,
          item.approvalStatus === "APPROVED"
            ? styles.approved
            : styles.pending,
        ]}
      >
        Status: {item.approvalStatus}
      </Text>

      {item.approvalStatus !== "APPROVED" && (
        <AppButton
          title="Approve Driver"
          onPress={() => approveDriver(item.phone)}
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading drivers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin — Driver Control</Text>

      {drivers.length === 0 ? (
        <Text style={styles.empty}>No drivers found</Text>
      ) : (
        <FlatList
          data={drivers}
          keyExtractor={(item) => item.id}
          renderItem={renderDriver}
        />
      )}

      <AppButton title="Refresh" onPress={fetchDrivers} />
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280",
  },
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    marginBottom: 16,
  },
  phone: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    color: "#475569",
    marginBottom: 4,
  },
  status: {
    fontWeight: "700",
    marginBottom: 12,
  },
  approved: {
    color: "#16a34a",
  },
  pending: {
    color: "#ca8a04",
  },
});

