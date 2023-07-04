import { View, Text,TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import axios from 'axios'

const ProviderSignupForm = ({navigation}) => {

    const onPressLogin=()=>{
        navigation.navigate('ProviderLoginScreen')
    }

    const SignupFormSchema=Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        
        password:Yup.string()
        .required()
        .min(6,'Your password has to be atleast 8 characters')
    })


    const [signup,setSignup]=useState([])
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')

    const [password,setPassword]=useState('')

    const signupUser = async (name,email,password,phone) => {
      try {
        console.log(email)
        console.log(password)
        console.log(name)
        console.log(phone)


        const response = await axios.post(
          'https://wixstocle.pythonanywhere.com/api/register/',
          {
            'name':name,
            'email':email,
            'password':password,
            'phone':phone,
            'type_of_user':"provider"
        } 
        )  
        setSignup(response.data);
        return response
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <View style={styles.wrapper}>
        <Formik 
            initialValues={{email:'',name:'',password:''}}
            onSubmit={values=>{
                onSignup(values.email,values.password,values.name)
            }}
            validationSchema={SignupFormSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid})=>(
                                <>
                       

                        <View style={[styles.inputField,
                        {
                            borderColor:
                            1
                            >values.name.length || values.name.length>=2
                            ? '#ccc'
                            :'red'
                        }
                        ]}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Name'
                                    autoCapitalize='none'
                                    textContentType='name'
                                    autoFocus={true}
                                    onChangeText={(name)=> setName(name)}

                            />
            
                        </View>

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
                                    placeholder='Phone Number'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    textContentType='name'
                                    onChangeText={(phone)=> setPhone(phone)}

                            />
            
                        </View>
                       
                        
                        <TouchableOpacity  
                        style={styles.button(isValid)}
                        onPress={()=>[signupUser(name,email,password,phone),
                        onPressLogin()
                        ]}
                        
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
            
                        
                        
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
        width:'80%',
        marginTop:15
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
export default ProviderSignupForm