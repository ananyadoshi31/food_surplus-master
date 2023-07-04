import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FilterHeader = (props,{ navigation }) => {

  const onPressCancel=()=>{
    navigation.navigate('Customer_search')
    console.log("hello")
  }

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      
            <View style={{marginBottom:10}}>
              <View
              style={{width:60,marginTop:10}}
               >
                {/* <TouchableOpacity
                style={{backgroundColor:'#00bcd4',width:60,marginLeft:10}}> */}
                
                <Image onPress={onPressCancel} style={styles.img} source={require('../../assets/cancel.png')}/>
                {/* </TouchableOpacity> */}
                
              </View>
              
                <Text 
                
                style={{
                        textAlign:'center',
                        fontSize:25,
                        fontWeight:'500',
                        marginTop:-40,
                        justifyContent:'center'

                }}>{props.title}
                </Text>
            </View>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  img:{
    width:5,
    height:5,
    padding:20,
    marginTop:10
  },
})
export default FilterHeader