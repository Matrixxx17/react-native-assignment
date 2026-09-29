import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function BranchMap() {
  const [me, setMe] = useState(null);
  const [message, setMessage] = useState('');

  const locate = async () => {
    setMessage('');
    const perm = await Location.requestForegroundPermissionsAsync();
    if (!perm.granted) {
      setMessage('Location permission denied');
      return;
    }
    try {
      const pos = await Location.getCurrentPositionAsync({});
      setMe({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    } catch (e) {
      setMessage('Could not get location');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Branch Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.076,
          longitude: 72.8777,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude: 19.076, longitude: 72.8777 }} title="MUMBAI" />
        {me ? <Marker coordinate={me} title="You" pinColor="blue" /> : null}
      </MapView>
      <Pressable style={styles.button} onPress={locate}>
        <Text style={styles.buttonText}>My location</Text>
      </Pressable>
      {message ? <Text style={styles.error}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#0a4a8a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    color: '#b00020',
    marginTop: 8,
  },
});