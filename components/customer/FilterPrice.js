import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Slider from '@react-native-community/slider';
import CustomerFooter from './CustomerFooter';

const FilterPrice = ({navigation}) => {
    const [sliderValue, setSliderValue] = useState("100");
    const onPressApply=()=>{
      navigation.navigate('Customer_search')
      
    }

  return (
    <View >
        <Text></Text>
        <Text></Text>
        <Text style={styles.location}>
            Price
        </Text>
      <Slider
        style={{width: 300, height: 40,alignSelf:'center'}}
        minimumValue={100}
        maximumValue={1000}
        step={100}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="gray"
        onValueChange={(value) => setSliderValue(value)}
        
      />
      <Text style={{alignSelf:'center',fontSize:20}}>{sliderValue}</Text>
      <Text></Text>
      <Text></Text>

      < View style={styles.button}>
            <TouchableOpacity
            onPress={onPressApply}
            >
                <Text style={{alignSelf:'center',marginTop:13.5,fontSize:18,fontWeight:'700'}}>
                    Apply Filters
                </Text>
            </TouchableOpacity>
        </View>
        
    </View>
      
  )
}

const styles=StyleSheet.create({
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
})

export default FilterPrice