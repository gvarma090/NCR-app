import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert, // ✅ REQUIRED
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");

  const proceed = () => {
    if (phone.length !== 10) {
      Alert.alert("Invalid Number", "Enter valid 10-digit mobile number");
      return;
    }

    navigation.navigate("RoleSelect", { phone });
  };

  return (
    <View style={styles.container}>
      {/* NCR LOGO */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.tagline}>Zero Commission Ride App</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={proceed}>
        <Text style={styles.buttonText}>Continue</Text>
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
  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 16,
  },
  tagline: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 16,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 20,
    borderColor: "#d1d5db",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
});

