import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Divider, SearchBar } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
const Customer_header = ({ navigation, route }) => {
    const onPressFilter = () => {
        navigation.navigate('FilterScreen')
    }

    const [item, setItem] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.location} source={require('../../assets/location.png')} />
                <View style={{ padding: 7 }}></View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                    <TextInput
                        placeholder='Search by location'
                        onChangeText={(item) => setItem(item)}
                        style={{ width: "60%" }}
                    />
                    <TouchableOpacity
                        style={{  marginLeft: 20 }}
                        onPress={() => navigation.navigate("Customer_search", {
                            paramKey1: item,
                            paramKey2: true

                        })}
                    >
                        <Text  style={{ color: 'black', fontSize: 18,marginRight:20 }}>Go</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text
                            onPress={onPressFilter}
                            style={{ color: 'black', fontSize: 18,marginRight:15 }}>
                                Filter
                        </Text>
                    </TouchableOpacity>
                </View>

               
            </View>

            <Divider orientation='horizontal' width={1} />

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    location: {
        height: 30,
        width: 30,
        marginTop: 6,
    },
    search: {
        justifyContent: 'center'
    },
    location_header: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
    },
    location_footer: {

    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    back: {
        height: 19,
        width: 19,
        transform: [{ rotate: '270deg' }],
        marginTop: 10,
    },

})

export default Customer_header