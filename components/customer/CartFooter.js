import { View, Text,StyleSheet, Image,Button,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartFooter = ({navigation}) => {
    const onPressGoToPayment=()=>{
        navigation.navigate('PaymentScreen')
    }
    const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          return token;
        } catch (error) {
          console.log('Error getting token:', error);
        }
      };

    var sum=0
    
    const [cartTotal,setCartTotal]=useState([])
    const [total,setTotal]=useState(0)
    
    const fetchTotalPrice =async () => {
        const token = await getToken();
        const headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          };
      
          const config = {
            headers: headers,
          };
        axios
          .get('https://wixstocle.pythonanywhere.com/api/cart/', config)
          .then(response => {
            const cartItems = response.data.cart_items;
            const total = cartItems.reduce((accumulator, item) => accumulator + item.food.price, 0);
            setTotal(total);
             console.log(total)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
// ******************************************************************************

      useEffect(() => {
        fetchTotalPrice();
      }, []);

  return (
    
    <View style={styles.container}>
        <View style={styles.cart_footer}> 
            <View style={{ flexDirection:'row', alignSelf:'center'}}>
                    <Image style={styles.icon} source={require('../../assets/cart.jpg')}/>
                        <Text style={{color:'white',
                        fontWeight:'400',
                        textAlign:'center',
                        marginTop:30
                        }}>
                            Your order will be ready soon
                        </Text>
            </View>
            <View>
                {/* <Button onPress={fetchTotalPrice} title="Calculate Total Price" /> */}

                {/* {total !== 0 && <Text style={{color:"#ffffff"}}>Total Price: {total}</Text>} */}
            </View>
            <View  style={{ flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}} >
                <Text style={styles.footer_text}>Total</Text>
                <Text  style={styles.footer_text}>Rs. {total}</Text>
            </View>       
            <TouchableOpacity style={styles.button}
            onPress={onPressGoToPayment}
            >
                <Text style={{color:'black', fontWeight:'600', textAlign:'center', fontSize:22}}>Next</Text>
            </TouchableOpacity>
        </View>
        
 
    </View>
    
  )
}

const styles=StyleSheet.create({

    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        position:'absolute',
        bottom:'0%',
        zIndex:999
    },
    cart_footer:{
        backgroundColor:'black',
        height:170,
        width:'100%',
        borderTopLeftRadius:50,
        borderTopRightRadius:50
    },
    icon:{
        height:40,
        width:40,
        marginTop:20
    },
     footer_text:{
        color:'#D1F952',
        fontSize:20,
        fontWeight:'700'
    },
     button:{
        backgroundColor:'#D1F952',
        width:'90%',
        height:50,
        alignSelf:'center', 
        padding:10, 
        marginTop:15
    }
 
})

export default CartFooter