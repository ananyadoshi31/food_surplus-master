import { View, Text,TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginForm = ({navigation}) => {

    const simpleAlertHandler = () => {
        alert('Wrong Credentials!');
      };

    const LoginFormSchema=Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        password:Yup.string()
        .required()
        .min(6,'Your password has to be atleast 8 characters')
    })

    const onPressForgot=()=>{
        navigation.navigate('ForgotPasswordScreen')
    }

    const onPressCustomer=()=>{
        navigation.navigate('Customer_search')
    }

    const onPressProviderOrder=()=>{
        navigation.navigate('ViewOrderScreen')
    }
    
    const onPressAdmin=()=>{
        navigation.navigate('AdminScreen')
    }
    
    // ************************************************************************
    const [login,setLogin]=useState([])
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [food,setFood]=useState([])

    const loginUser = async (email,password) => {
      try {

        if(email==="admin@admin.com" && password==="admin123")
        {
        console.log(email)
        console.log(password)
        const response = await axios.post(
          'https://wixstocle.pythonanywhere.com/api/login/',
          {
            'email':email,
          'password':password
        } ,{ 
            headers: {
                // 'Authorization': `Token 406dc678a48ec07da71ab020c6412dc65583be44`, 
                'Content-Type': 'application/json'
            },   
        }
        )  
        const token = response.data.token;
        // Store the token in AsyncStorage
        await storeToken(token);
        setLogin(response.data);
        navigation.navigate('AdminScreen')
        return response
        }
        else{
            console.log(email)
        console.log(password)
        const response = await axios.post(
          'https://wixstocle.pythonanywhere.com/api/login/',
          {
            'email':email,
          'password':password
        } ,{ 
            headers: {
                // 'Authorization': `Token 406dc678a48ec07da71ab020c6412dc65583be44`, 
                'Content-Type': 'application/json'
            },   
        }
        )  
        const token = response.data.token;
        // Store the token in AsyncStorage
        await storeToken(token);
        setLogin(response.data);
        navigation.navigate('Customer_search')
        return response
        }
        
      } catch (error) {
        // Alert.alert("Wrong credentials!")
        simpleAlertHandler()
      }
    };


    const storeToken = async (token) => {
        try {
          await AsyncStorage.setItem('token', token);
        } catch (error) {
          console.log('Error storing token:', error);
        }
      };


  return (
    
    <View  style={styles.wrapper}>
        <Formik 
            initialValues={{email:'',password:''}}
            onSubmit={values=>{
                onLogin(values.email,values.password)
            }}
            validationSchema={LoginFormSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid})=>(
                                <>
                        <View style={[styles.inputField,
                        {
                            borderColor:
                            values.email.length<1 || Validator.validate(values.email)
                            ? '#ccc'
                            :'red'
                        }]}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Email'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    textContentType='emailAddress'
                                    autoFocus={true}
                                    onChangeText={(email)=> setEmail(email)}
                                  
                            />
            
                        </View>
            
                        <View style={[styles.inputField,
                        {
                            borderColor:
                            1>values.password.length || values.password.length>=6
                            ? '#ccc'
                            : 'red'
                        }]}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Password'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    textContentType='password'
                                    onChangeText={(password)=> setPassword(password)}
                                    
                                    // onBlur={handleBlur('password')}
                                    // value={values.password}
                            />
            
                        </View>
                        <View  style={{alignItems:'flex-end', marginBottom:30}}>
                            <Text 
                            onPress={onPressForgot}
                            style={{color:'#6BB0F5',marginRight:10}}>Forgot Password?</Text>
                        </View>
                        
                        <TouchableOpacity  
                        style={styles.button(isValid)}
                        onPress={()=>
                         loginUser(email,password)
                        
                        }
                        
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
            
                        <View style={styles.signupContainer}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={()=>navigation.push('SignupScreen')}>
                                <Text style={{color:'#6BB0F5'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signupContainer}>
                            <Text>Are you a provider? </Text>
                            <TouchableOpacity onPress={()=>navigation.push('ProviderLoginScreen')}>
                                <Text style={{color:'#6BB0F5'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        </>
            )}

        </Formik>
        
    </View>
 
  )
}

const styles=StyleSheet.create({
    inputField:{
        borderRadius:4,
        width:'80%',
        padding:10,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1,
        alignSelf:'center',
        marginTop:10

    },
    wrapper:{
        // marginTop:80,
        padding:5
    },
    button: isValid=>({
        backgroundColor: isValid?'#D1F952':'#C9DF82',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4,
        alignSelf:'center',
        width:'80%'
    }),
    buttonText:{
        fontWeight:'600',
        color:'#000000',
        fontSize:20
    },
    signupContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:50
    }
})
export default LoginForm