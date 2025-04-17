import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Category = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Categories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.box}>
                    <MaterialIcons name="important-devices" size={30} color="black" style={styles.myicon} />
                    <Text style={styles.text}>Electronics</Text>
                </View>
                <View style={styles.box}>
                    <Ionicons name="shirt-outline" size={30} color="black" style={styles.myicon} />
                    <Text style={styles.text}>Clothes</Text>
                </View>
                <View style={styles.box}>
                    <MaterialCommunityIcons name="cricket" size={30} color="black" style={styles.myicon} />
                    <Text style={styles.text}>Sports</Text>
                </View>
                <View style={styles.box}>
                    <MaterialIcons name="local-grocery-store" size={30} color="black" style={styles.myicon} />
                    <Text style={styles.text}>Grocery</Text>
                </View>
                <View style={styles.box}>
                    <AntDesign name="medicinebox" size={30} color="black" style={styles.myicon} />
                    <Text style={styles.text}>Health&Beauty</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '95%',
        elevation: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    head: {
        color: 'red',
        fontSize: 25,
        fontWeight: '300',
        margin: 10,
        alignSelf: 'center',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    box: {
        color: 'white',
        margin: 10,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myicon: {
        marginRight: 10,
        color: 'black',
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    }
})
