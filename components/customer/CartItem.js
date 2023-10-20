import { View, Text,StyleSheet, Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Divider } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
const CartItem = ({navigation}) => {
    const [cart,setCart]=useState([])
    const [cartImg,setCartImg]=useState([])
    
    const cartGet = async () => {
        const token = await getToken();
        try {
          const response = await axios.get(
            'https://wixstocle.pythonanywhere.com/api/cart/', { 
              headers: {
                  'Authorization': `Token ${token}`, 
              }, 
          }
          )
          const result=response.data
          const result2=result.cart_items
          setCartImg(result2.food)
          setCart(result.cart_items);
          return response  
        } catch (error) {
          console.error(error);
        }
      };
// *****************************************************
const [del,setDel]=useState([])
const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };
  


const deleteCart = async (id) => {
    
    const token = await getToken();

  try {
    console.log(id)
    const response = await axios.delete(
      `https://wixstocle.pythonanywhere.com/api/cart/${id}/`,
      { 
        headers: {
            'Authorization': `Token ${token}`, 
            'Content-Type': 'application/json'
        },   
    }
    )  
    setDel(response.data);
    return response
  } catch (error) {
    console.log(error);
  }
};


      useEffect(() => {
        cartGet();
      }, []);

  return (
    <>
  
    <View >
            <View style={{marginBottom:10}}>
            <Image style={{width:20,height:50,padding:20,marginTop:-30}} source={{uri: 'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png'}}/>
                <Text style={{
                        textAlign:'center',
                        fontSize:20,
                        fontWeight:'500',
                        marginTop:-40

                }}>Cart</Text>
            </View>
            <Divider width={1} orientation='vertical'/>
            <ScrollView style={{height:440}}>
            {cart.map((product) => (
                 

            <View key={product.id} style={styles.container}>     
            
                   
                    <View style={styles.item_box}>          
                            <View style={{alignSelf:'flex-end', flexDirection:'row'}}>
                                <Text style={{fontWeight:'700',fontSize:20, marginRight:12}}>{product['food'].name}</Text>
                                    <TouchableOpacity 
                                    onPress={()=>deleteCart(product.id)}
                                    style={{flexDirection:'row', justifyContent:'space-around'}}>
                                        <Image  style={styles.icons} source={require('../../assets/decrement.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-around'}}>
                                        <View style={styles.middleicon}>
                                            <Text style={{
                                                fontWeight:'500',
                                                color:'black',  
                                                textAlign:'center',
                                                fontSize:18
                                            }}>1</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-around'}}>
                                        <Image  style={styles.icons} source={require('../../assets/increment.png')}/>
                                    </TouchableOpacity>
                            </View>
                            <View style={{padding:10, marginTop:-10}}>
                                
                            

                                <Text style={{color:'#CB1206', fontWeight:'500', textAlign:'center'}}>Expiry: {product['food'].age} hrs</Text>
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                    <Text style={styles.text}>{product['food'].quantity} kg</Text>
                                    
                                    <Text style={styles.text}>Rs. {product['food'].price}</Text>
                                    
                                </View>   
                            </View>
                    </View> 
            </View>
           
   
    ))}
    </ScrollView>        

</View>
    </>
  )
  
}

const styles=StyleSheet.create({
    location_footer:{
        color:'white',
        marginTop:5,
        width:'100%'
    },
    location_inner:{
        marginTop:5,
        height:20,
        width:20
    },
    container:{
        // flex:1,
        padding:8,
        marginTop:0,
        width:'90%'
    },

    item_box:{
        height:100,
        width:'90%',
        backgroundColor:'#F0F0F0',
        alignSelf:'flex-end',
        borderRadius:20
    },
    text:{
        paddingHorizontal:3,
        fontSize:15,
        fontWeight:'500',
        textAlign:'center',
        alignSelf:'center'
    },
    location_footer:{
        color:'black',
        marginTop:5,
        width:'100%'
    },
    icons:{
        height:30, width:30,
        marginTop:10,marginRight:10
        
    },
    middleicon:
    {
        height:30, width:30,
        marginTop:10,marginRight:10,
        backgroundColor:'#D1F952',
        borderRadius:50

    },


})

export default CartItem