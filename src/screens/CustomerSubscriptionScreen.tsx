import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomerSubscriptionScreen({ route, navigation }: any) {
  const { phone } = route.params;

  const selectPlan = (plan: 'FREE' | 'SILVER' | 'GOLD') => {
    navigation.replace('CustomerHome', { phone, plan });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>

      {/* FREE */}
      <TouchableOpacity style={styles.card} onPress={() => selectPlan('FREE')}>
        <Text style={styles.plan}>FREE ₹0</Text>
        <Text>• Fair price only</Text>
        <Text>• No custom price</Text>
        <Text>• No bargaining</Text>
      </TouchableOpacity>

      {/* SILVER */}
      <TouchableOpacity style={styles.card} onPress={() => selectPlan('SILVER')}>
        <Text style={styles.plan}>SILVER ₹50</Text>
        <Text>• 1 custom price / day</Text>
        <Text>• 2 bargain rides / day</Text>
        <Text>• Max 3 attempts / ride</Text>
      </TouchableOpacity>

      {/* GOLD */}
      <TouchableOpacity style={styles.card} onPress={() => selectPlan('GOLD')}>
        <Text style={styles.plan}>GOLD ₹100</Text>
        <Text>• 2 custom price / day</Text>
        <Text>• 10 bargain rides / day</Text>
        <Text>• Max 3 attempts / ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center'
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16
  },
  plan: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6
  }
});

