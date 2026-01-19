import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

const API = "http://100.52.126.162:4000";

export default function AdminDashboardScreen() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await fetch(`${API}/api/auth/admin/drivers`);
      const data = await res.json();
      setDrivers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const callAdminAction = async (action: string, phone: string) => {
    await fetch(`${API}/api/auth/admin/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });

    Alert.alert("Success", `Driver ${action} successful`);
    fetchDrivers();
  };

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
      <Text style={styles.title}>👮 Admin Dashboard</Text>

      <FlatList
        data={drivers}
        keyExtractor={(item) => item.phone}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.phone}>📱 {item.phone}</Text>
            <Text>🚗 {item.vehicleType}</Text>
            <Text>Status: {item.approvalStatus}</Text>
            <Text>Blocked: {item.blocked ? "YES" : "NO"}</Text>

            <View style={styles.actions}>
              {item.approvalStatus !== "APPROVED" && (
                <ActionBtn
                  text="Approve"
                  color="#22c55e"
                  onPress={() => callAdminAction("approve", item.phone)}
                />
              )}

              {!item.blocked && (
                <ActionBtn
                  text="Block"
                  color="#ef4444"
                  onPress={() => callAdminAction("block", item.phone)}
                />
              )}

              {item.blocked && (
                <ActionBtn
                  text="Unblock"
                  color="#3b82f6"
                  onPress={() => callAdminAction("unblock", item.phone)}
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

function ActionBtn({ text, color, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor: color }]}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc"
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2
  },
  phone: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6
  },
  actions: {
    flexDirection: "row",
    marginTop: 10
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 10
  },
  btnText: {
    color: "#ffffff",
    fontWeight: "700"
  }
});

