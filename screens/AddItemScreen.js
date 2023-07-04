import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import AdminPage from '../components/admin/AdminPage'
import AddItem from '../components/Provider/AddItem'
const AddItemScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <AddItem navigation={navigation}/>
    </View>
  )
}
 const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:60,

    },
 })
export default AddItemScreen