import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomerFooter from '../components/customer/CustomerFooter'
import { ScrollView } from 'react-native-gesture-handler'
import FilterHeader from '../components/customer/FilterHeader'
import PlacedOrders from '../components/Provider/PlacedOrders'
import ProviderFooter from '../components/Provider/ProviderFooter'
const PlacedOrderScreen = ({navigation},props) => {
  return (
    <View style={styles.container}>
        <FilterHeader navigation={navigation} title="View Placed Orders"/>
        <ScrollView>
            <PlacedOrders navigation={navigation}/>
        </ScrollView>
          
        <ProviderFooter navigation={navigation}/>
    </View>
  )
}
 const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },

 })
export default PlacedOrderScreen