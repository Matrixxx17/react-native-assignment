import React, { useState } from 'react';
import { Text, TextInput, Pressable, ScrollView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
const LEVELS = ['HIGH', 'MEDIUM', 'LOW'];

export default function ClaimForm({navigation}) {
  const [policyNo, setPolicyNo] = useState('');
  const [amount, setAmount] = useState('');
  const [urgency, setUrgency] = useState('MEDIUM');
  const [hospital, setHospital] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notifmsg, setNotifmsg] = useState('')
  const submit = async () => {
  setError('');
  setSuccess('');
  setNotifmsg('')
  const no = policyNo.trim();
  if (!no) {
    setError('Policy number is required');
    return;
  }
  try {
    const raw = await AsyncStorage.getItem('hdfc.claims');
    const claims = raw ? JSON.parse(raw) : [];
    claims.push({
      policyNo: no,
      amount: Number(amount) || 0,
      urgency,
      hospital: hospital.trim(),
      createdAt: new Date().toISOString(),
    });
    await AsyncStorage.setItem('hdfc.claims', JSON.stringify(claims));
    // console.log(JSON.parse(await AsyncStorage.getItem('hdfc.claims')));
    setSuccess(`Claim submitted for ${no}`);
  } catch (e) {
    setError('Could not save claim');
  }
  try {
      const perm = await Notifications.requestPermissionsAsync();
      if (perm.granted) {
        await Notifications.scheduleNotificationAsync({
          content: { title: 'HDFC Life', body: `Claim submitted for ${no}` },
          trigger: null,
        });
      } else {
        setNotifmsg('Notification permission denied');
      }
    } catch (e) {
      setNotifmsg('Notification permission denied');
    }
};

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>File a Claim</Text>

      <Text style={styles.label}>Policy number</Text>
      <TextInput
        style={styles.input}
        value={policyNo}
        onChangeText={setPolicyNo}
        placeholder="HDFC-LIFE-1001"
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="0"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Urgency</Text>
      <View style={styles.levels}>
        {LEVELS.map((level) => (
          <Pressable
            key={level}
            onPress={() => setUrgency(level)}
            style={[styles.chip, urgency === level && styles.chipActive]}
          >
            <Text style={urgency === level ? styles.chipTextActive : styles.chipText}>{level}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Hospital</Text>
      <TextInput
        style={styles.input}
        value={hospital}
        onChangeText={setHospital}
        placeholder="Optional"
      />

      <Pressable style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Submit claim</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      {notifmsg ? <Text style={styles.error}>{notifmsg}</Text> : null}
            <Pressable style={styles.secondary} onPress={() => navigation.navigate('HospitalBill')}>
        <Text style={styles.secondaryText}>Add hospital bill photo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 10, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#bbb', borderRadius: 8, padding: 10, fontSize: 16 },
  levels: { flexDirection: 'row', gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, borderColor: '#bbb' },
  chipActive: { backgroundColor: '#0a4a8a', borderColor: '#0a4a8a' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff' },
  button: { backgroundColor: '#0a4a8a', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 18 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondary: { padding: 14, alignItems: 'center', marginTop: 12 },
  secondaryText: { color: '#0a4a8a', fontWeight: '600' },
  error: { color: '#b00020', marginTop: 12 },
  success: { color: '#1b7f3b', marginTop: 12, fontWeight: '600' },
});