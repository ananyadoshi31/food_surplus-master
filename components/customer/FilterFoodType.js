import { View, Text,ScrollView ,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'


const FilterFoodType = () => {

    const categories="bread"
    

  return (
    <View>
        <View style={{alignSelf:'flex-end', marginRight:15}}>
            <TouchableOpacity>
                <Text style={{fontSize:17}}>
                    Clear All
                </Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text></Text>
        </View>
    <ScrollView 
        style={{}}
        horizontal
    >
        <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            >
                <Image 
                style={styles.img}
                source={require('../../assets/drinks.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15, alignSelf:'center'}}>Drinks</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>
      {/* ********************************************************* */}
      <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            >
                <Image 
                style={styles.img}
                source={require('../../assets/food.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15}}>Food</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>

      <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            >
                <Image 
                style={styles.img}
                source={require('../../assets/deserts.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15}}>Deserts</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>

      <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            
            >
                <Image 
                style={styles.img}
                source={require('../../assets/snacks.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15}}>Snacks</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>

    </ScrollView>
    </View>
    
  )
}
const styles=StyleSheet.create({
    box:{
        backgroundColor:'#F0F0F0',
        height:100,
        width:80,
        borderRadius:25,
        marginLeft:20,
    },
    img:{
        height:50,
        width:50,
        alignSelf:'center',
        marginTop:25,
    }
})

export default FilterFoodType