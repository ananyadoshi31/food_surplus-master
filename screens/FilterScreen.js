import { View, Text,ScrollView,TouchableOpacity,StyleSheet,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import FilterHeader from '../components/customer/FilterHeader'
import FilterFoodType from '../components/customer/FilterFoodType'
import FilterLocation from '../components/customer/FilterLocation'
import FilterPrice from '../components/customer/FilterPrice'
import CustomerFooter from '../components/customer/CustomerFooter'
import Slider from '@react-native-community/slider';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilterScreen = ({ navigation,route }) => {

  const [sliderValue, setSliderValue] = useState("10");
    const onPressApply=()=>{
      navigation.navigate('Customer_search')
      
    }

    const [filter, setFilter] = useState([]);
    const [category,setCategory]=useState('')
    const [price,setPrice]=useState('')
    const [location,setLocation]=useState('')
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        return token;
      } catch (error) {
        console.log('Error getting token:', error);
      }
    };
    const filterData = async (name) => {
      const token = await getToken();

      try {
        const price=""
        const location=""
        console.log("working")
        console.log(category)
        const response = axios.get(`https://wixstocle.pythonanywhere.com/api/search?name=&category=${category}&price_low=0&price_high=${price}&location=${location}`,
       { 
        headers: {
            'Authorization': `Token ${token}`, 
            'Content-Type': 'application/json'
        },   
    }
        )
        setFilter((await response).data)
        console.log((await response).data)
        return response.data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
// ****************************************************************

useEffect(() => {
  // filterData("");
}, []);

  return (
    <View style={{backgroundColor:'white',flex:1}}>
        <FilterHeader navigation={navigation} title="Filter"/>
        
         <View>
        <View style={{alignSelf:'flex-end', marginRight:15}}>
            <TouchableOpacity>
                <Text style={{fontSize:17}}>
                    Clear All
                </Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text></Text>
        </View>
    <ScrollView 
        style={{}}
        horizontal
    >
        <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            onPress={()=>setCategory("bread")}
            >
                <Image 
                style={styles.img}
                source={require('../assets/drinks.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15, alignSelf:'center'}}>Drinks</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>
      {/* ********************************************************* */}
      <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            onPress={()=>setCategory("food")}

            >
                <Image 
                style={styles.img}
                source={require('../assets/food.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15}}>Food</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>

      <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            onPress={()=>setCategory("deserts")}

            >
                <Image 
                style={styles.img}
                source={require('../assets/deserts.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15}}>Deserts</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>

      <View style={{height:150}}>
            <View style={styles.box}>
            <TouchableOpacity
            onPress={()=>setCategory("snacks")}
            
            >
                <Image 
                style={styles.img}
                source={require('../assets/snacks.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text>           </Text>
                <Text style={{marginTop:15}}>Snacks</Text>
            </View>
        </View>

      <View>
        <Text>     </Text>
      </View>

    </ScrollView>
    </View>


    <View>
      <Text style={styles.location}>Location</Text>
      <Text></Text>
      <View style={{flexDirection:'row'}}>
        <View style={styles.boxs}>
            <TouchableOpacity
            onPress={()=>setLocation("Mumbai")} 
            >
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Mumbai</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.boxs}>
            <TouchableOpacity
            onPress={()=>setLocation("Pune")} 
            >
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Pune</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.boxs}>
            <TouchableOpacity
            onPress={()=>setLocation("Nashik")} 
            >
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Nashik</Text>
            </TouchableOpacity>
        </View>
      </View>
      {/* ************************ */}
      <Text></Text>
      <View style={{flexDirection:'row'}}>
        <View style={styles.boxs}>
            <TouchableOpacity
            onPress={()=>setLocation("Nagpur")} 
            >
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Nagpur</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.boxs}>
            <TouchableOpacity
            onPress={()=>setLocation("Thane")} 
            >
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Thane</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.boxs}>
            <TouchableOpacity>
                <Text style={{alignSelf:'center',fontWeight:'500',marginTop:10}}>Near Me</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>



    <View >
        <Text></Text>
        <Text></Text>
        <Text style={styles.location}>
            Price
        </Text>
      <Slider
        style={{width: 300, height: 40,alignSelf:'center'}}
        minimumValue={10}
        maximumValue={1000}
        step={50}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="gray"
        onValueChange={(value) => setSliderValue(value)}
        
      />
      <Text style={{alignSelf:'center',fontSize:20}}>{sliderValue}</Text>
      <Text></Text>
      <Text></Text>

      < View style={styles.button}>
            <TouchableOpacity
            onPress={()=>navigation.navigate("Customer_search",{
              paramKey1:category,
              paramKey2:location,
              paramKey3:sliderValue
            })}
            >
                <Text style={{alignSelf:'center',marginTop:13.5,fontSize:18,fontWeight:'700'}}>
                    Apply Filters
                </Text>
            </TouchableOpacity>
        </View>
        
    </View>


        <CustomerFooter navigation={navigation}/>
        
    </View>
  )
}

const styles=StyleSheet.create({
  box:{
      backgroundColor:'#F0F0F0',
      height:100,
      width:80,
      borderRadius:25,
      marginLeft:20,
  },
  img:{
      height:50,
      width:50,
      alignSelf:'center',
      marginTop:25,
  },
  location:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:20,
},
button:{
alignSelf:'center',
backgroundColor:'#D1F952',
height:54,
width:300,
borderRadius:25,
},
location:{
  fontSize:20,
  fontWeight:'bold',
  marginLeft:20,
},
boxs:{
  backgroundColor:'#F0F0F0',
  height:40,
  width:100,
  marginLeft:20,
  borderRadius:10,

}
})


export default FilterScreen