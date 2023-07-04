import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import AdminPage from '../components/admin/AdminPage'

const AdminScreen = ({navigation}) => {

  const onPressLogoutFromAdmin=()=>{
    navigation.navigate('LoginScreen')
}
  return (
    <View style={styles.container}>
      
        <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../assets/adminlogo.png')}/>
        </View>

        <AdminPage navigation={navigation}/>
    </View>
  )
}
 const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:60,

    },
    logoContainer:{
        alignItems:'center',
        marginTop:40,   
    },
    logo:{
        height:180,
        width:180,
        marginBottom:-60
    }

 })
export default AdminScreen