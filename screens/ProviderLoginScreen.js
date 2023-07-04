import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import LoginForm from '../components/loginScreen/LoginForm'
import ProviderLoginForm from '../components/loginScreen/ProviderLoginForm'
const ProviderLoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../assets/main-logo.png')}/>
        </View>

        <View style={styles.texts}>
            <Text style={styles.login_title}>
                Provider Log In
            </Text>
        </View>
        <ProviderLoginForm navigation={navigation}/>
        <View style={{
            backgroundColor:'#000',
            height:120,
            top:110,
            borderTopRightRadius:80
        }}></View>
    </View>
  )
}
 const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:60,

    },
    login_title:{
        color:'#000000',
        fontSize:35,
        fontWeight:'bold',
    },
    texts:{

        width:'80%',
        padding:10,
        alignSelf:'center',
        marginTop:40
    },
    logoContainer:{
        alignItems:'center',
        marginTop:40,   
    },
    logo:{
        height:200,
        width:200,
        marginBottom:-60
    }

 })
export default ProviderLoginScreen