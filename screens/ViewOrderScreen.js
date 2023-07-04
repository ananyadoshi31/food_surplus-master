import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import ViewOrder from '../components/Provider/ViewOrder'
import CustomerFooter from '../components/customer/CustomerFooter'
import OrderDetails from '../components/Provider/OrderDetails'
import { ScrollView } from 'react-native-gesture-handler'
import ProviderFooter from '../components/Provider/ProviderFooter'
const ViewOrderScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <ViewOrder navigation={navigation}/>
        <ScrollView>
        <OrderDetails navigation={navigation}/>
        </ScrollView>
        
        <ProviderFooter navigation={navigation}/>
        
    </View>
  )
}
 const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:60,
        // paddingHorizontal:12
    },

 })
export default ViewOrderScreen