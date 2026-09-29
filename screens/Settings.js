import { View,Text,TextInput,Pressable,ScrollView,StyleSheet } from "react-native"
import { useState,useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from 'expo-secure-store';
const NAME_KEY = 'hdfc.advisorName';
const TOKEN_KEY = 'hdfc.advisorToken';
export default function Settings() {
    const [nameInput,setNameInput] = useState('')
    const [savedName,setSavedName] = useState('')
    const [tokenStatus,setTokenStatus] = useState('')
    const [net, setNet] = useState({state: 'idle',text:''})
    useEffect(() =>{
        (
            async () => {
                    const n = await AsyncStorage.getItem(NAME_KEY)
                    if(n) setSavedName(n)
                    let t = await  SecureStore.getItemAsync(TOKEN_KEY)
                if(!t) {
                    await SecureStore.setItemAsync(TOKEN_KEY,'advisor-token-1001')
                    t = await SecureStore.getItemAsync(TOKEN_KEY)
                }
                if(t) setTokenStatus('Token Saved')
            })()
    }, [])

    const saveName = async () =>{
        const v = nameInput.trim()
        await AsyncStorage.setItem(NAME_KEY,v)
        setSavedName(v)
    }
    const issueToken = async () =>{
        await SecureStore.setItemAsync(TOKEN_KEY,'advisor-token-1001')
        const t = await SecureStore.getItemAsync(TOKEN_KEY)
        setTokenStatus(t === 'advisor-token-1001'? 'Token Saved': 'Token Missing')
    }

    const request = async(url) =>{
        setNet({state:'loading',text: 'Loading'}) 
        try {
            const res = await fetch(url)
            if(!res.ok) throw new Error('bad status') 
            const data = await res.json()
            setNet({state:'ok', text:data.name})       
        } catch(e){
            setNet({state:'error',text:'Network error'})
        }
    } 
return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Settings</Text>

      <Text style={styles.label}>Advisor name</Text>
      <TextInput style={styles.input} value={nameInput} onChangeText={setNameInput} placeholder="Enter name" />
      <Pressable style={styles.button} onPress={saveName}>
        <Text style={styles.buttonText}>Save name</Text>
      </Pressable>
      {savedName ? <Text style={styles.info}>Advisor: {savedName}</Text> : null}

      <Pressable style={styles.button} onPress={issueToken}>
        <Text style={styles.buttonText}>Issue token</Text>
      </Pressable>
      {tokenStatus ? <Text style={styles.info}>{tokenStatus}</Text> : null}

      <Pressable style={styles.button} onPress={() => request('https://jsonplaceholder.typicode.com/users/1')}>
        <Text style={styles.buttonText}>Check network</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => request('https://jsonplaceholder.typicode.com/this-will-404-xyz')}>
        <Text style={styles.buttonText}>Break network</Text>
      </Pressable>
      {net.text ? <Text style={net.state === 'error' ? styles.error : styles.info}>{net.text}</Text> : null}

      <Text style={styles.note}>Deep link: hdfclife://policy/HDFC-LIFE-1004</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#bbb', borderRadius: 8, padding: 10, fontSize: 16 },
  button: { backgroundColor: '#0a4a8a', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  info: { fontSize: 16, marginTop: 8, color: '#1b7f3b' },
  error: { fontSize: 16, marginTop: 8, color: '#b00020' },
  note: { marginTop: 24, color: '#555' },
});