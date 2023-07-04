import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider, SearchBar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'


const ViewOrder = ({ navigation }) => {

    const onPressAddItem=()=>{
        navigation.navigate('AddItemScreen')
    }
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };
    return (

        <View style={styles.wrapper}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ height: 30, marginBottom: 10 }}>
                    <Image style={{ width: 20, height: 50, padding: 20, marginTop: -10, marginLeft: -40 }} source={{ uri: 'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png' }} />
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '500',
                        marginTop: -40

                    }}>View Orders</Text>
                </View>
                    <TouchableOpacity
                        onPress={onPressAddItem}
                        
                        style={{ backgroundColor: 'black', width:'25%', padding:8, marginTop:-10, height:40 }} >
                            <Text style={{ color: '#fff', textAlign:'center', fontWeight:'500' }}>Add item</Text>
                    </TouchableOpacity>
                
            </View>
            <Divider width={1} orientation='vertical' />
            <ScrollView>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                    <SearchBar
                        placeholder="Search"
                        lightTheme
                        searchIcon={{ size: 24 }}
                        autoCorrect={false}
                        cancelIcon={true}
                        round
                        inputContainerStyle={{ backgroundColor: '#ffffff', height: 40, alignSelf: 'center' }}
                        containerStyle={{ backgroundColor: '#E9E9E9', width: '98%', alignSelf: 'center' }}
                        onChangeText={updateSearch}
                        value={search}
                    />
                </View>
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({

    wrapper: {
        marginTop: -5,
        // padding:0
    },
    button: isValid => ({
        backgroundColor: isValid ? '#000' : '#A09E9E',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        alignSelf: 'center',
        width: '80%',
        marginTop: 20
    }),
    buttonText: {
        fontWeight: '600',
        color: '#ffffff',
        fontSize: 20
    },

})
export default ViewOrder