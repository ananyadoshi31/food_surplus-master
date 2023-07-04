import { View, Text,TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
// import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen'


const ForgotPasswordForm = ({navigation}) => {

    const LoginFormSchema=Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        password:Yup.string()
        .required()
        .min(6,'Your password has to be atleast 8 characters')
    })

    

  return (
    <View style={styles.wrapper}>
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
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                            />
            
                        </View>
            
                        
                        
                        <TouchableOpacity  
                        style={styles.button(isValid)}
                        onPress={handleSubmit}
                        
                        >
                            <Text style={styles.buttonText}>Send Email for OTP</Text>
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
export default ForgotPasswordForm