import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler'

const FilterLocation = () => {
  return (
    <View>
      <Text style={styles.location}>Location</Text>
      <Text></Text>
      <View style={{flexDirection:'row'}}>
        <View style={styles.box}>
            <TouchableOpacity>
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Mumbai</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.box}>
            <TouchableOpacity>
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Pune</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.box}>
            <TouchableOpacity>
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Nashik</Text>
            </TouchableOpacity>
        </View>
      </View>
      {/* ************************ */}
      <Text></Text>
      <View style={{flexDirection:'row'}}>
        <View style={styles.box}>
            <TouchableOpacity>
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Nagpur</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.box}>
            <TouchableOpacity>
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Thane</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.box}>
            <TouchableOpacity>
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Near Me</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
    location:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:20,
    },
    box:{
        backgroundColor:'#F0F0F0',
        height:40,
        width:100,
        marginLeft:20,
        borderRadius:10,

    }
})

export default FilterLocation