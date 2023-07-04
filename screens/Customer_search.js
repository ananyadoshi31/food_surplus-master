import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Customer_header from '../components/customer/Customer_header'
import FoodItem from '../components/customer/FoodItem'
import CustomerFooter from '../components/customer/CustomerFooter'
import Search from '../components/customer/Search'
import { ScrollView } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
const Customer_search = ({navigation}) => {
  const route=useRoute()
  return (
    <View style={styles.container}>
        <Customer_header  route={route} navigation={navigation}/>
        {/* <Search navigation={navigation} /> */}
        <ScrollView>
          <FoodItem route={route} navigation={navigation}/>

        </ScrollView>
        <CustomerFooter  navigation={navigation}/>

    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
})

export default Customer_search