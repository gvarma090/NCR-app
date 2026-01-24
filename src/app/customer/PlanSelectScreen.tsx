import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PlanSelectScreen({ navigation }: any) {
  const selectPlan = (plan: 'FREE' | 'SILVER' | 'GOLD') => {
    navigation.replace('CustomerHome', { plan });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>

      {/* FREE */}
      <TouchableOpacity
        style={[styles.card, styles.free]}
        onPress={() => selectPlan('FREE')}
      >
        <Text style={styles.planTitle}>FREE</Text>
        <Text style={styles.text}>• Book at fair price</Text>
        <Text style={styles.text}>• No custom price</Text>
        <Text style={styles.text}>• No bargaining</Text>
      </TouchableOpacity>

      {/* SILVER */}
      <TouchableOpacity
        style={[styles.card, styles.silver]}
        onPress={() => selectPlan('SILVER')}
      >
        <Text style={styles.planTitle}>SILVER — ₹50</Text>
        <Text style={styles.text}>• 1 custom-price ride/day</Text>
        <Text style={styles.text}>• 2 bargain rides/day</Text>
        <Text style={styles.save}>Save ₹3,600 per year</Text>
      </TouchableOpacity>

      {/* GOLD */}
      <TouchableOpacity
        style={[styles.card, styles.gold]}
        onPress={() => selectPlan('GOLD')}
      >
        <Text style={styles.planTitle}>GOLD — ₹100</Text>
        <Text style={styles.text}>• 2 custom-price rides/day</Text>
        <Text style={styles.text}>• 10 bargain rides/day</Text>
        <Text style={styles.save}>Save ₹7,200 per year</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        *Calculated at avg 10 km/day usage
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  save: {
    fontSize: 13,
    marginTop: 8,
    fontStyle: 'italic',
  },

  /* COLORS */
  free: {
    backgroundColor: '#E3F2FD', // Blue
  },
  silver: {
    backgroundColor: '#ECEFF1', // Silver
  },
  gold: {
    backgroundColor: '#FFF8E1', // Gold
  },

  note: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
  },
});

