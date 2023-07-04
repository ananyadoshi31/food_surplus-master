import { View, Text, StyleSheet,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import {Divider} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PlacedOrders = ({navigation}) => {

   
  return (
    <>
    {details?.map((product) => (
    <View style={styles.wrapper}>
        <View style={styles.out_box}>
                <View style={styles.in_box}>
                    <View>
                        {/* <Text style={styles.text}>Restaurant Name: Jalpan</Text> */}
                        <Text style={styles.text}>Food Name: {product['food'].name}</Text>
                        <Text style={styles.text}>Expiry: {product['food'].age}</Text>
                        <Text style={styles.text}>Quantity: {product['food'].quantity}kg</Text>
                        <Text style={styles.text}>Price: Rs. {product['food'].price} </Text>
                    </View>
                    {/* <View style={{justifyContent:'space-between'}}>
                         <Image style={{width:50,height:50}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/6329/6329732.png'}}/>
                    </View> */}
                    
                </View>
            
        </View>
        <Text></Text>
        <Divider width={0.7} orientation='horizontal'/>
        

        
    </View>
    ))}
    </>
  )
}

const styles=StyleSheet.create({

    wrapper:{
        marginTop:-5,
        
    },
    out_box: {
        backgroundColor:'#E9E9E9',
        marginTop:20,
        width:'92%',
        alignSelf:'center',
        height:160
         },
    in_box:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        padding:2,
        fontSize:15,
        fontWeight:'500'
    }
    

    
   
})
export default PlacedOrders