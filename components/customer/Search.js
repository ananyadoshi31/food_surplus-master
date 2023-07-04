import { View, Text,StyleSheet } from 'react-native'
import React,{useState,useEffect, useRef,} from 'react'
import { SearchBar } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
const Search = () => {
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
    setSearch(search);
    };
    const [searchTerm, setSearchTerm] = useState("");
    const [data,setData]=useState([])
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
      
        const requests = axios.get('https://wixstocle.pythonanywhere.com/api/food/')
        
        const responses = await axios.all(requests);
        const results = responses.name
        console.log(results);
        setData(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    

  return (
    <View>

        <Text></Text>
      <SearchBar
            placeholder="Search"
            lightTheme
            searchIcon={{ size: 24 }}
            autoCorrect={false}
            cancelIcon={true}
            round
            inputContainerStyle={{backgroundColor:'#ffffff', height:40}}
            containerStyle={{backgroundColor:'#E9E9E9', width:'98%'}}
            onChangeText={updateSearch}
            value={search}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
        />
        <View>
        {data
            
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              }
            })
            
            .map((val) => (
              <View  key={val.id}>
                <img src={val.thumbnail} alt="" />
                <h3>{val.name}</h3>
                <Text >${val.current_price}</Text>
              </View>
            ))}
        </View>
             
    </View>
  )
}

const styles=StyleSheet.create({
    
})

export default Search