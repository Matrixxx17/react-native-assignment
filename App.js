import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import PoliciesList from './screens/PoliciesList';
import PolicyDetail from './screens/PolicyDetail';
import ClaimForm from './screens/ClaimForm';
import HospitalBill from './screens/HospitalBill';
import Settings from './screens/Settings';
import BranchMap from './screens/BranchMap';

const Tab = createBottomTabNavigator()
const PolicyStack = createNativeStackNavigator()
const ClaimStack = createNativeStackNavigator()

function PolicyStackScreen() {
  return (
    <PolicyStack.Navigator screenOptions={{headerShown: false}}>
      <PolicyStack.Screen name='PoliciesList' component={PoliciesList}></PolicyStack.Screen>
      <PolicyStack.Screen name='PolicyDetail' component={PolicyDetail}></PolicyStack.Screen>
    </PolicyStack.Navigator>  
  )
}

function ClaimStackScreen() {
  return (
    <ClaimStack.Navigator screenOptions={{headerShown: false}}>
      <ClaimStack.Screen name='ClaimForm' component={ClaimForm}></ClaimStack.Screen>
      <ClaimStack.Screen name='HospitalBill' component={HospitalBill}></ClaimStack.Screen>
    </ClaimStack.Navigator>
  )
}

Notifications.setNotificationHandler({
  handleNotification: async () =>({
    // shouldShowAlert: true5
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

if (Platform.OS==="android"){
  Notifications.setNotificationChannelAsync('default',{
    name: 'default',
    importance: Notifications.AndroidImportance.DEFAULT,
  })
}
const linking = {
  prefixes: [Linking.createURL('/'), 'hdfclife://'],
  config: {
    screens: {
      PoliciesTab: {
        screens: {
          PolicyDetail: 'policy/:policyNo',
        },
      },
    },
  },
};
export default function App() {
 return ( <NavigationContainer linking={linking}>
  <Tab.Navigator screenOptions={{headerTitle: 'HDFC Life Advisor'}}>
    <Tab.Screen name='PoliciesTab' component={PolicyStackScreen} options={{tabBarLabel:'Policies'}}></Tab.Screen>
    <Tab.Screen name='ClaimTab' component={ClaimStackScreen} options={{tabBarLabel:'Claim'}}></Tab.Screen>
    <Tab.Screen name='MapTab' component={BranchMap} options={{tabBarLabel:'Map'}}></Tab.Screen>
    <Tab.Screen name='Setting' component={Settings} options={{tabBarLabel:'Settings'}}></Tab.Screen>
  </Tab.Navigator>
 </NavigationContainer>
 )
}
