
import { View, Text ,StyleSheet,TouchableOpacity, Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const bottomTabIcons=[
    {
        name:'Home',
        Homeactive:'https://www.clipartmax.com/png/middle/223-2238157_house-black-building-shape-free-icon-black-home-icon-png.png',
        Homeinactive:'https://cdn-icons-png.flaticon.com/512/1946/1946488.png',

    },
    {
        name:'Saved',
        active:'https://static.vecteezy.com/system/resources/previews/012/528/097/original/simple-save-icon-isolated-on-white-background-bookmark-symbol-modern-simple-for-web-site-or-mobile-app-vector.jpg',
        inactive:'https://pixlok.com/wp-content/uploads/2021/10/Save_Icon_SvG_O3mv3w.png',

    },
    {
        name:'Cart',
        active:'https://cdn.icon-icons.com/icons2/2717/PNG/512/shopping_cart_simple_icon_173589.png',
        inactive:'https://www.iconpacks.net/icons/2/free-shopping-cart-icon-3041-thumb.png',

    },
    {
        name:'Profile',
        active:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbX0lZHrfSwrUBz8gcmZ1mlUEXB8ULTGoJll6sEtiQ4VUiX-LwYUkOl9lv3MqgmRquack&usqp=CAU',
        inactive:'https://static.thenounproject.com/png/2324586-200.png',

    },
]

const CustomerFooter = ({navigation}) => {

// ******************************************************
const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };
  
// *****************************************************



    const onPressLogoutFromCustomer=()=>{
        navigation.navigate('LoginScreen')
    }
    const onPressGoToCart=()=>{
        navigation.navigate('CartScreen')
    }
    const onPressCustomerSearch=()=>{
        navigation.navigate('Customer_search')
    }

    const [activeTabs,setActiveTabs]=useState('Home')
    const Icon=({icon})=>(
        <TouchableOpacity onPress={()=>setActiveTabs(icon.name)}>
            <Image source={{uri:activeTabs===icon.name ? icon.active: icon.inactive}}
             style={[styles.icon, 
             icon.name==='Profile' ? styles.profilePic(): null,
             activeTabs==="Profile" && icon.name===activeTabs
             ? styles.profilePic(activeTabs)
             :null
             ]}/>
        </TouchableOpacity>
    )

    const [logout,setLogout]=useState('')
    
    const logoutUser = async () => {
        const token = await getToken();

        try {
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
           
            <View style={{flexDirection:'row',justifyContent:'space-around',zIndex:999,width:'100%',}}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={onPressCustomerSearch}>
                    <Image
                    style={styles.icon}
                        source={{uri:'https://cdn-icons-png.flaticon.com/512/1946/1946488.png'}}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity>
                    <Image
                    style={styles.icon}
                        source={{uri:'https://pixlok.com/wp-content/uploads/2021/10/Save_Icon_SvG_O3mv3w.png'}}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={onPressGoToCart}>
                    <Image
                    style={styles.icon}
                        source={{uri:'https://www.iconpacks.net/icons/2/free-shopping-cart-icon-3041-thumb.png'}}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity 
                    onPress={()=>logoutUser()}>
                    <Image
                    style={styles.icon}
                    source={require('../../assets/logout.png')}
                    />
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    
    
  )
}



const styles=StyleSheet.create({
    wrapper:{
    position:'absolute',
    bottom:'0%',
    zIndex:999,
    backgroundColor:'#ffffff'
    // marginHorizontal:20
    // justifyContent:'space-around'
    },
    icon:{
      width:30,
      height:30,  
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        paddingTop:10,
        // margin:10,
        marginLeft:10,
        marginRight:10,
        
    },
    profilePic:(activeTabs='')=>({
        
        borderRadius:50,
        borderWidth:activeTabs==='Profile' ? 2 : 0,
        borderColor:'#fff'
    }),
})

export default CustomerFooter