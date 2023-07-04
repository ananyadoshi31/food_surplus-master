import { View, Text,TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Divider} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AddItem = ({navigation}) => {

    const AddItemSchema=Yup.object().shape({
        restaurant_name:Yup.string().required('A restaurant name is required'),
        name:Yup.string().required('A name is required'),
        age:Yup.number().positive().required('Food age is required'),
        quantity:Yup.number().required('Quantity is required'),
        price:Yup.number().positive().required('Price is required'),
        city:Yup.string().required('City name is required'),
        area:Yup.string().required('Restaurant area is required'),
        phone:Yup.number().required('Phone number is required'),

    })


    const [item,setItem]=useState([])
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [price,setPrice]=useState('')
    const [restaurant_name,setRest_name]=useState('')
    const [city,setCity]=useState('')
    const [area,setArea]=useState('')
    const [phone,setPhone_num]=useState('')
    const [quantity,setQuantity]=useState('')
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState('')
// ***********************************************************************************************
const [image, setImage] = useState(null)
const [upload, setUpload] = useState(false) 

// const convertToBlob = async (imageUri) => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log('Error converting image to blob:', e);
//         reject(new TypeError('Error converting image to blob'));
//       };
//       const uriParts = imageUri.split('.');
//     const fileType = uriParts[uriParts.length - 1];
//     xhr.responseType = 'blob';

//     if (Platform.OS === 'ios') {
//       xhr.open('GET', imageUri, true);
//     } else {
//       // Android requires a file:// prefix
//       const fileUri = `file://${imageUri}`;
//       xhr.open('GET', fileUri, true);
//     }
//       xhr.send(null);
//     });
//   };

const convertUrlToBlob = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.log('Error converting URL to blob:', error);
      return null;
    }
  };


const pickImage = async () => {
const result =  await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4,3],
    quality: 1
});

if (!result.canceled)
{
    setImage(result.assets[0].uri)
    console.log(result.assets[0].uri)
}

// const blobfile=await convertToBlob(image)
const blob = await convertUrlToBlob(image);

setUpload(blob)

}; 

// const uploadImage = async () => {
// setUpload(true)
// const response = await fetch(image.uri)
// const blob = response.blob()
// // const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
// console.log(blob)

// try {
//     // await ref;
//     console.log("upload")
// } catch (e){
//     console.log(e)
// }
// setUpload(false)
// Alert.alert(
//     'Image uploaded successfully'
// );
// setImage(null);
// } 
// ***********************************************************************************************

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };
  
// ***********************************************************

    const addItem = async (name,age,description,price,category,restaurant_name,city,area,phone,quantity) => {
      
    const token = await getToken();
    console.log(token)
        try {
        // var fs = require('fs');
        var FormData = require('form-data');
        var data = new FormData();
        // // data.append('food_image',upload)
        // // data.append('food_image', image);
        data.append('name', name);
        data.append('age', age);
        data.append('description', description);
        data.append('price', price);
        data.append('category', category);
        data.append('quantity', quantity);
        data.append('city', city);
        data.append('area', area);
        data.append('restaurant_name', restaurant_name);
        data.append('phone', phone);
        const response = await axios.post(
          'https://wixstocle.pythonanywhere.com/api/food/',
        //   {
            
        //     "name": name,
        //     "age": age,
        //     "description": description,
        //     "price": price,
        //     "category":category,
        //     "restaurant_name": restaurant_name,
        //     "city":city,
        //     "area":area,
        //     "phone":phone,
        //     "quantity": quantity,
        // } ,
        data,
        { 
            headers: {
                'Authorization': `Token ${token}`, 
                'Content-Type': 'multipart/form-data'
            },    
        }
        )  
        setItem(response.data);
        navigation.navigate("ViewOrderScreen")
        return response
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <View style={styles.wrapper}>
        <View style={{height:30,marginBottom:10}}>
            <Text style={{
                    textAlign:'center',
                    fontSize:20,
                    fontWeight:'500'

            }}>Add New Food Item</Text>
        </View>
        
       <Divider width={1} orientation='vertical'/>
       <Text></Text>
       <ScrollView >

      
        {/* <Formik 
            initialValues={{restaurant_name:'',name:'',age:'',quantity:'',price:'',city:'',area:'',phone:''}}
            // onSubmit={values=>{
            //     onSignup(values.name)
            // }}
            validationSchema={AddItemSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid})=>(
            <> */}
                        
                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Enter food name'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    onChangeText={(name)=> setName(name)}

                            />
                        </View>

                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Age'
                                    autoCapitalize='none'
                                    // keyboardType="numeric"
                                    autoFocus={true}
                                    onChangeText={(age)=> setAge(age)}

                            />
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Description'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    // keyboardType="numeric"
                                    onChangeText={(description)=> setDescription(description)}

                            />  
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Price'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    keyboardType="numeric"
                                    onChangeText={(price)=> setPrice(price)}

                            />  
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Category'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    
                                    onChangeText={(category)=> setCategory(category)}

                            />  
                        </View>

                        <View style={[styles.inputField
                        ]}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Restaurant Name'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    onChangeText={(restaurant_name)=> setRest_name(restaurant_name)}
                            />
            
                        </View>

                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='City'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    onChangeText={(city)=> setCity(city)}

                            />
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Restaurant Area'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    onChangeText={(area)=> setArea(area)}
                            />
            
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Phone number'
                                    autoCapitalize='none'
                                    autoFocus={true}
                                    keyboardType={'phone-pad'}
                                    onChangeText={(phone)=> setPhone_num(phone)}
                            />
            
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Quantity'
                                    autoCapitalize='none'
                                    keyboardType="numeric"
                                    autoFocus={true}
                                    onChangeText={(quantity)=> setQuantity(quantity)}
                            />
            
                        </View>
                        {/* <View>
                            <TouchableOpacity
                            onPress={pickImage}
                            >
                                <Text>Upload Image</Text>
                            </TouchableOpacity>
                        </View> */}

                        <TouchableOpacity  
                            style={styles.button}
                            onPress={()=>addItem(name,age,description,price,category,restaurant_name,city,area,phone,quantity)}   
                        >
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
            

            {/* </>
            )}

        </Formik> */}
    </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    inputField:{
        borderRadius:4,
        width:'80%',
        padding:5,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1,
        alignSelf:'center',
        marginTop:10,
    },
    wrapper:{
        marginTop:-5,
        // padding:0
    },
    button: {
        backgroundColor:'#A09E9E',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4,
        alignSelf:'center',
        width:'80%',
        marginTop:20
    },
    buttonText:{
        fontWeight:'600',
        color:'#ffffff',
        fontSize:20
    },
})
export default AddItem