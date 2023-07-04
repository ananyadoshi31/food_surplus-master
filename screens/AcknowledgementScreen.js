import { View, Text,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'


const AcknowledgementScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor:'#fafbfb',flex:1}}>
        <Text></Text>
        <Image  
        style={{height:150,width:150,alignSelf:'center',marginTop:50}}
        // source={require('../assets/payment_success.png')}
        source={{uri:'https://media.tenor.com/Hw7f-4l0zgEAAAAC/check-green.gif'}}
        />
      <Text style={{color:'gray',fontWeight:'700',fontSize:20, alignSelf:'center'}}>
        Your payment was successful
      </Text>
      <Text></Text>
      <Text style={{color:'gray',fontWeight:'300',fontSize:15, alignSelf:'center',width:'80%',textAlign:'center'}}>
        Thank you for your payment. We will start preparing your order right away
      </Text>
      <Text></Text>
      <View style={{backgroundColor:'#D9D9D9',height:300,width:300,alignSelf:'center',borderRadius:50}}>
        <Text></Text>
        <Text></Text>
            <Text style={{alignSelf:'center',width:'80%',fontSize:22,textAlign:'center',fontWeight:'bold'}}>
                THANK YOU FOR PLACING THE ORDER
            </Text>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity style={{alignSelf:'center'}}>
                <Text style={{color:'#55c2c3',fontSize:20}}>
                    Explore More {'>'}
                </Text>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
            <Text style={{alignSelf:'center',width:'80%',fontSize:16,textAlign:'center',fontWeight:'400'}}>
                Order will be packed with utmost care and handled by sanitized staff... 
            </Text>
      </View>
      
    </View>
  )
}

export default AcknowledgementScreen