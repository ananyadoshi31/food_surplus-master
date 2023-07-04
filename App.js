// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// ************************************************************
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AdminScreen from './screens/AdminScreen';
import Customer_search from './screens/Customer_search';
import AddItemScreen from './screens/AddItemScreen'
import ViewOrderScreen from './screens/ViewOrderScreen'
import AcknowledgementScreen from './screens/AcknowledgementScreen';
import FilterScreen from './screens/FilterScreen';
import CartScreen from './screens/CartScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PaymentScreen from './screens/PaymentScreen'
import PlacedOrderScreen from './screens/PlacedOrderScreen'
import ProviderSignupScreen from './screens/ProviderSignupScreen';
import ProviderLoginScreen from './screens/ProviderLoginScreen';
const Stack=createStackNavigator()

const screenOptions={
    headerShown:false,
}
const App = ()=>
{
  return(
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={screenOptions}
        >
            <Stack.Screen name='AdminScreen' component={AdminScreen}/>
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='SignupScreen' component={SignupScreen}/>
            <Stack.Screen name='Customer_search' component={Customer_search}/>
            <Stack.Screen name='AddItemScreen' component={AddItemScreen}/>
            <Stack.Screen name='ViewOrderScreen' component={ViewOrderScreen}/>
            <Stack.Screen name='AcknowledgementScreen' component={AcknowledgementScreen}/>
            <Stack.Screen name='FilterScreen' component={FilterScreen}/>
            <Stack.Screen name='CartScreen' component={CartScreen}/>
            <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
            <Stack.Screen name='PaymentScreen' component={PaymentScreen}/>
            <Stack.Screen name='PlacedOrderScreen' component={PlacedOrderScreen}/>
            <Stack.Screen name='ProviderSignupScreen' component={ProviderSignupScreen}/>
            <Stack.Screen name='ProviderLoginScreen' component={ProviderLoginScreen}/>

        </Stack.Navigator>
    </NavigationContainer>
  )
}



export default App 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
