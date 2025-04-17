import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import cartlogo from '../../assets/images/logo.png';

const Welcomescreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome To Shipkart</Text>
            <View style={styles.logoout}>
                <Image style={styles.logo} source={cartlogo} />
            </View>
            <View style={styles.hr80} />

            <Text style={styles.text}>Your one-stop destination for everything you need, from daily essentials to luxury items, with unbeatable prices and exceptional service.</Text>

            <View style={styles.hr80} />

            <View style={styles.btnout}>
                <TouchableOpacity onPress={() => navigation.navigate('Signupscreen')}>
                    <Text style={styles.btn}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Loginscreen')}>
                    <Text style={styles.btn}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Welcomescreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    logoout: {
        width: '92%',
        height: '30%',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    hr80: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 15,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        width: '80%',
        fontWeight: 'bold',
    },
    btnout: {
        flexDirection: 'row',
    },
    btn: {
        fontSize: 30,
        color: 'red',
        textAlign: 'center',
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 15,
    },
})