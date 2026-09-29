import { View,Text,Pressable,Image,StyleSheet } from "react-native"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker'
export default function HospitalBill() {
    const [uri,setUri] = useState()
    const [message,setMessage] = useState('')
    const takePhoto = async() =>{
        setMessage('')
        const perm = await ImagePicker.requestCameraPermissionsAsync()
        if(!perm.granted) {
            setMessage("Camera Permission Granted")
            return 
        }
        const result = await ImagePicker.launchCameraAsync({quality:0.7})
        if(!result.canceled){
            setUri(result.assets[0].uri)
        }
    }

    const chooseFromGallery = async () =>{
        setMessage('')
        const perm = await ImagePicker.launchImageLibraryAsync()
        if(!perm.granted) {
            setMessage("Camera Permission Granted")
            return 
        }
        const result = await ImagePicker.launchCameraAsync({quality:0.7})
        if(!result.canceled){
            setUri(result.assets[0].uri)
        }
    }


    return <View style={styles.container}>
      <Text style={styles.heading}>Hospital Bill</Text>
      <Pressable style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take photo</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={chooseFromGallery}>
        <Text style={styles.buttonText}>Choose from gallery</Text>
      </Pressable>
      {message ? <Text style={styles.error}>{message}</Text> : null}
      {uri ? <Image source={{ uri }} style={styles.preview} resizeMode="contain" /> : null}
    </View>
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  button: { backgroundColor: '#0a4a8a', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  error: { color: '#b00020', marginTop: 8 },
  preview: { width: '100%', height: 300, marginTop: 16 },
});