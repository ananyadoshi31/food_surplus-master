import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, SearchBar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecommendedItems = () => {
  const [cart, setCart] = useState([])
  const [food, setFood] = useState([])



  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };

  const recommend_item_get = async () => {
    const token = await getToken();
    try {
      const response = await axios.get(
        'http://wixstocle.pythonanywhere.com/api/recommendations', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      }
      )
      const result = response.data
      setCart(result);
      return response
    } catch (error) {
      console.error(error);
    }
  }

  const recommend_item_post = async (id) => {
    try {

      const token = await getToken();

      const response = await axios.post(
        "https://wixstocle.pythonanywhere.com/api/cart/",
        { quantity: 1, food: id },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFood(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    recommend_item_get();
  }, []);


  return (
    <>

      <View style={styles.wrapper} >
        <Divider width={1} orientation="horizontal" />
        <View style={{ padding: 5 }}>
          <Text style={{ fontWeight: '600', marginHorizontal: 10 }}>VIEW RECOMMENDATIONS</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={{ padding: 10, flexDirection: 'row' }}

        >
          {cart.map((product) => (
            <View style={{padding:5}}>


              <View style={[styles.box, styles.shadowProp]}>
                {/* <Image style={styles.icons} source={require('../../assets/rice.jpg')} /> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7 }}>
                  <Text style={{ color: 'black', fontWeight: '500' }}>{product.name}</Text>
                  <TouchableOpacity
                    onPress={() => recommend_item_post(product.id)}
                  >
                    <View style={styles.middleicon}>
                      <Text style={{
                        fontWeight: '500',
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 18, marginTop: -3
                      }}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 12, fontWeight: '500', textAlign: 'center' }}>Rs. {product.price}</Text>
                {/* <Text style={{ fontSize: 12, fontWeight: '500', textAlign: 'center' }}>Rs. {product.location}</Text> */}


              </View>
            </View>


          ))}

        </ScrollView>

        <Divider width={1} orientation="horizontal" />

      </View>

    </>

  )

}
const styles = StyleSheet.create({
  wrapper: {
    marginTop: '5%'
  },
  box: {
    backgroundColor: '#F0F0F0',
    height: 80,
    width: 140,
    borderRadius: 20,
    borderWidth: 0.3,
    borderColor: 'gray',

  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icons: {
    height: 90, width: 140,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  middleicon:
  {
    height: 25, width: 25,
    marginRight: 10,
    backgroundColor: '#D1F952',
    borderRadius: 50

  },
})
export default RecommendedItems