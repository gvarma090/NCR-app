import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function AppButton({ title, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 16, backgroundColor: "#2563eb", borderRadius: 12 }}
    >
      <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

