import { View,Text,FlatList,Pressable,Image,StyleSheet } from "react-native"
import policies from "../data/policies.json"
export default function PoliciesList({navigation}) {
    return <View style={styles.container}>
        <Image source={require('../assets/icon.png')} style={styles.logo}/>
        <Text style={styles.heading}>Policies</Text>
        <FlatList
        data={policies}
        keyExtractor={(item) => item.policyNo}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            onPress={() => navigation.navigate('PolicyDetail', { policyNo: item.policyNo })}
          >
            <Text style={styles.policyNo}>{item.policyNo}</Text>
            <Text style={styles.customer}>{item.customer}</Text>
          </Pressable>
        )}
      />
    </View>
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff"
    },
      logo: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f2f4f8',
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  policyNo: {
    fontSize: 16,
    fontWeight: '600',
  },
  customer: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
})  