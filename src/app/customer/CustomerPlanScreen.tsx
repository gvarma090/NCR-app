import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomerPlanScreen({ navigation }: any) {
  const selectPlan = (plan: 'FREE' | 'SILVER' | 'GOLD') => {
    navigation.navigate('CustomerHome', { plan });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <Text style={styles.subtitle}>
        Save more on every ride with NCR subscriptions
      </Text>

      {/* FREE */}
      <TouchableOpacity
        style={[styles.card, styles.free]}
        onPress={() => selectPlan('FREE')}
      >
        <Text style={styles.plan}>FREE</Text>
        <Text style={styles.desc}>Ride at fair app price</Text>
      </TouchableOpacity>

      {/* SILVER */}
      <TouchableOpacity
        style={[styles.card, styles.silver]}
        onPress={() => selectPlan('SILVER')}
      >
        <Text style={styles.plan}>SILVER · ₹50 / month</Text>
        <Text style={styles.desc}>Custom & bargain rides</Text>
        <Text style={styles.save}>Save ₹3,600 per year</Text>
      </TouchableOpacity>

      {/* GOLD */}
      <TouchableOpacity
        style={[styles.card, styles.gold]}
        onPress={() => selectPlan('GOLD')}
      >
        <Text style={styles.plan}>GOLD · ₹100 / month</Text>
        <Text style={styles.desc}>Maximum flexibility & savings</Text>
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
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 30,
  },
  card: {
    padding: 22,
    borderRadius: 18,
    marginBottom: 18,
  },
  plan: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    marginTop: 6,
  },
  save: {
    fontSize: 12,
    marginTop: 10,
    fontStyle: 'italic',
    color: '#333',
  },
  free: {
    backgroundColor: '#E3F2FD', // blue
  },
  silver: {
    backgroundColor: '#ECEFF1', // silver
  },
  gold: {
    backgroundColor: '#FFF8E1', // gold
  },
  note: {
    marginTop: 12,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
  },
});

