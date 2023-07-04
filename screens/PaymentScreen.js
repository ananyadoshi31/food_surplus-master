import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FilterHeader from '../components/customer/FilterHeader'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ navigation }) => {
    const [current, setCurrent] = useState("test");

    const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          return token;
        } catch (error) {
          console.log('Error getting token:', error);
        }
      };
    const [pay, setPay] = useState([]);

  const payment = async (id) => {
    const token = await getToken();
    try {
      // console.log(token)
      const response = await axios.post(
        "https://wixstocle.pythonanywhere.com/api/order/",
        {

        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPay(response.data);
      navigation.navigate("Customer_search")
      return response;
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <View style={styles.container}>
            <FilterHeader title="Payment" />
            <View style={styles.box}>
                <RadioButtonGroup
                    containerStyle={{ padding: 10, backgroundColor:'#F0F0F0',
                    height:'42%',width:'100%'
                }}
                    selected={current}
                    onSelected={(value) => setCurrent(value)}
                    radioBackground="gray"
                >
                    <RadioButtonItem 
                    value="test2" 
                    label={
                        <Text style={styles.text}>Online Payment</Text>
                        } />
                    <RadioButtonItem
                        value="test"
                        label={
                            <Text style={styles.text}>Cash on Delivery</Text>
                        }
                    />
                </RadioButtonGroup>
                <TouchableOpacity 
                onPress={payment}
                style={styles.button}>
                        <Text style={styles.buttontext}>
                            Proceed
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    box:{
        width:'90%',
        alignSelf:'center',
        marginTop:180

    },
    text:{ color: "black",padding:20,fontSize:20,fontWeight:'600' },
    button:{
        backgroundColor:'black',
        padding:15,
        marginTop:70,
        width:'70%',
        alignSelf:'center'

    },
    buttontext:{
        color:'white',
        textAlign:'center',
        fontWeight:'600',
        fontSize:15
    }

})
export default PaymentScreen