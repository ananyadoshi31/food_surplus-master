import { View, Text,StyleSheet,Image ,ScrollView} from 'react-native'
import React from 'react'
import ViewOrder from '../components/Provider/ViewOrder'
import CustomerFooter from '../components/customer/CustomerFooter'
import OrderDetails from '../components/Provider/OrderDetails'
import CartItem from '../components/customer/CartItem'
import CartFooter from '../components/customer/CartFooter'
import RecommendedItems from '../components/customer/RecommendedItems'
// import { ScrollView } from 'react-native-gesture-handler'
const CartScreen = ({navigation}) => {



  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
        <CartItem navigation={navigation}/>
      {/* </ScrollView> */}
        
        <RecommendedItems/>
        <CartFooter navigation={navigation}/>
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
export default CartScreen