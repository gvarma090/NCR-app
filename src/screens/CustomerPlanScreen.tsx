import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomerPlanScreen({ route, navigation }: any) {
  const { phone } = route.params;

  const selectPlan = (plan: 'FREE' | 'SILVER' | 'GOLD') => {
    navigation.navigate('CustomerHome', { phone, plan });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>

      {/* FREE */}
      <TouchableOpacity style={styles.card} onPress={() => selectPlan('FREE')}>
        <Text style={styles.plan}>FREE</Text>
        <Text>• Book at fair price only</Text>
        <Text>• No custom price</Text>
        <Text>• No bargaining</Text>
      </TouchableOpacity>

      {/* SILVER */}
      <TouchableOpacity style={styles.card} onPress={() => selectPlan('SILVER')}>
        <Text style={styles.plan}>SILVER — ₹50</Text>
        <Text>• 1 custom-price ride/day</Text>
        <Text>• 2 bargain rides/day</Text>
        <Text>• Max 3 attempts</Text>
      </TouchableOpacity>

      {/* GOLD */}
      <TouchableOpacity style={styles.card} onPress={() => selectPlan('GOLD')}>
        <Text style={styles.plan}>GOLD — ₹100</Text>
        <Text>• 2 custom-price rides/day</Text>
        <Text>• 10 bargain rides/day</Text>
        <Text>• Max 3 attempts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#f9fafb',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  plan: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8
  }
});

