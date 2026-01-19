import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

const API_URL = 'http://100.52.126.162:4000';

export default function CustomerBargainScreen({ route, navigation }: any) {
  const { phone, fairPrice, plan } = route.params;

  const [rideId, setRideId] = useState<string | null>(null);
  const [offer, setOffer] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [locked, setLocked] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔑 CREATE RIDE ONLY ONCE
  useEffect(() => {
    const createRide = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rides/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerPhone: phone,
            source: 'A',
            destination: 'B',
            fairPrice
          })
        });

        const data = await res.json();
        setRideId(data.id);
      } catch (err) {
        Alert.alert('Backend unreachable');
      }
    };

    createRide();
  }, []);

  const sendBargain = async () => {
    if (!rideId) return;
    if (!offer) return Alert.alert('Enter your price');

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/bargain/offer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rideId,
          offeredPrice: Number(offer),
          customerPhone: phone
        })
      });

      const data = await res.json();

      if (data.locked) {
        setLocked(true);
        setFinalPrice(data.finalPrice);
        Alert.alert('Bargain Closed', data.message);
      } else {
        setAttemptsLeft(data.attemptsLeft);
        Alert.alert(
          'Rejected',
          `Driver rejected. Attempts left: ${data.attemptsLeft}`
        );
      }
    } catch (err) {
      Alert.alert('Backend unreachable');
    }

    setLoading(false);
    setOffer('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bargain Ride</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Fair Price</Text>
        <Text style={styles.price}>₹{fairPrice}</Text>
      </View>

      {locked ? (
        <View style={styles.lockedBox}>
          <Text style={styles.lockedText}>
            Final Price Applied: ₹{finalPrice}
          </Text>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation.navigate('CustomerHome')}
          >
            <Text style={styles.btnText}>Done</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.attempts}>
            Bargain Attempts Left: {attemptsLeft}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your price"
            keyboardType="numeric"
            value={offer}
            onChangeText={setOffer}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={sendBargain}
            disabled={loading}
          >
            <Text style={styles.btnText}>
              {loading ? 'Sending...' : 'Send Bargain'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#eef2ff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20
  },
  label: {
    color: '#4b5563',
    fontSize: 14
  },
  price: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1e40af'
  },
  attempts: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 16
  },
  doneBtn: {
    backgroundColor: '#16a34a',
    padding: 18,
    borderRadius: 16,
    marginTop: 20
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700'
  },
  lockedBox: {
    backgroundColor: '#dcfce7',
    padding: 20,
    borderRadius: 16
  },
  lockedText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});

