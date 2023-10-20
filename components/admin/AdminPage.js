import { View, Text,TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminPage = ({navigation}) => {
    const onPressLogoutFromAdmin=()=>{
        navigation.navigate('LoginScreen')
    }

    const simpleAlertHandler = () => {
        alert('Your message has been sent successfully!');
      };

    const AdminPageSchema=Yup.object().shape({
        name:Yup.string().required('A username is required'),

    })

    const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          return token;
        } catch (error) {
          console.log('Error getting token:', error);
        }
      };
      
const [selected, setSelected] = useState("");



  
  const data = [
      {key:'1', value:'Customer'},
      {key:'2', value:'Provider'},
      
  ]
  const [message,setMessage]=useState('')

  const messageFromAdmin = async (message) => {
    const token = await getToken();
    try {
      console.log(message)
      const response = await axios.post(
        'https://wixstocle.pythonanywhere.com/api/notifications/',
        {
            "title": "Test Notiifcation",
            "message": message,
            "user": 2
      } ,{ 
          headers: {
              'Authorization': `Token ${token}`, 
              'Content-Type': 'application/json'
          },   
      }
      )  
      setMessage(response.data);
      return response
    } catch (error) {
      console.log(error);
    }
  };



  const [logout, setLogout] = useState('')

  const logoutUser = async () => {
      const token = await getToken();
      try {
          console.log(token)
          const response = await axios.post(
              'https://wixstocle.pythonanywhere.com/api/logout/',
              {

              },
              {
                  headers: {
                      'Authorization': `Token ${token}`,
                      //   'Content-Type': 'application/json'
                  },
              }
          )
          setLogout(response.data);
          navigation.navigate('LoginScreen')
          console.log("log out success")
          return response
      } catch (error) {
          console.log(error);
      }
  };

  return (
    <View style={styles.wrapper}>
        <TouchableOpacity 
        onPress={logoutUser}
        style={{alignSelf:'flex-end', padding:20, marginTop:-20}}>
            <Text style={{fontSize:15, fontWeight:'500'}}>Log out</Text>
        </TouchableOpacity>
        <View style={{width:'80%',alignSelf:'center'}}>
            <SelectList 
                
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
            />
        </View>
       
        <Formik 
            initialValues={{name:''}}
            onSubmit={values=>{
                onSignup(values.name)
            }}
            validationSchema={AdminPageSchema}
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
                                    placeholder='Write your message...'
                                    autoCapitalize='none'
                                    textContentType='name'
                                    autoFocus={true}
                                    onChangeText={(message)=>setMessage(message)}
                            />
            
                        </View>
            
                        <TouchableOpacity  
                            style={styles.button(isValid)}
                            onPress={()=>messageFromAdmin(message)}
                        >
                            <Text style={styles.buttonText}>SEND</Text>
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
        marginTop:10,
        height:'50%'

    },
    wrapper:{
        marginTop:80,
        padding:5
    },
    button: isValid=>({
        backgroundColor: isValid?'#000':'#A09E9E',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4,
        alignSelf:'center',
        width:'80%',
        marginTop:20
    }),
    buttonText:{
        fontWeight:'600',
        color:'#ffffff',
        fontSize:20
    },
   
})
export default AdminPage







