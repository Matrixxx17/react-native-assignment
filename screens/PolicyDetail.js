import React from "react"
import { View,Text,ScrollView,StyleSheet} from "react-native"
import policies from "../data/policies.json"
export default function PolicyDetail({route}) {
    const policyNo=route.params?.policyNo
    const policy = policies.find((p)=>p.policyNo === policyNo)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Policy Detail</Text>
            {
                policy ? (
                    <>
          <Text style={styles.line}>{policy.policyNo}</Text>
          <Text style={styles.line}>{policy.customer}</Text>
          <Text style={styles.line}>{policy.type}</Text>
          <Text style={styles.line}>{policy.basePremium}</Text>
          <Text style={styles.line}>{policy.status}</Text>
                    </>
                ): (
        <Text style={styles.line}>Policy not found</Text>
      )
            }
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
     heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  line: {
    fontSize: 18,
    marginBottom: 8,
  },
})