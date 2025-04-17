import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import { myip } from '../../myip';
import axios from 'axios';

const Forgetpassword = () => {

    // hook to show focus password
    const [emailfocus, setEmailfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [confirmpasswordfocus, setConfirmpasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [showconfirmpassword, setShowconfirmpassword] = useState(false);

    // hook to store password value
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    // function to send data to backend server
    const handelforget = () => {
        const api_url = `${myip}/forgetpassword.php`;

        if (password === confirmpassword) {
            const formdata = new FormData();
            formdata.append('email', email);
            formdata.append('password', password);

            axios.post(`${api_url}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status === 'success') {
                        Alert.alert("Message", "password changed...");
                        setEmail('');
                        setPassword('');
                        setConfirmpassword('');
                    } else {
                        Alert.alert("Message", "password not changed...");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            Alert.alert("Message", "Password and confirm password does not match...")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Password...</Text>
            <View style={styles.inputout}>
                <Entypo name="email" size={30} color={emailfocus === true ? 'red' : 'grey'} />
                <TextInput style={styles.input} placeholder='Email..' onFocus={() => {
                    setEmailfocus(true);
                    setPasswordfocus(false);
                    setConfirmpasswordfocus(false);
                }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.inputout}>
                <Entypo name="lock" size={30} color={passwordfocus === true ? 'red' : 'grey'} />
                <TextInput style={styles.input} placeholder='New Password..' secureTextEntry={showpassword === false ? true : false}
                    onFocus={() => {
                        setEmailfocus(false);
                        setPasswordfocus(true);
                        setConfirmpasswordfocus(false);
                    }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <Octicons name={showpassword === false ? 'eye-closed' : 'eye'} size={24} color="black" onPress={
                    () => { setShowpassword(!showpassword) }
                } style={{ position: 'absolute', right: 10, marginRight: 5 }} />
            </View>

            <View style={styles.inputout}>
                <Entypo name="lock" size={30} color={confirmpasswordfocus === true ? 'red' : 'grey'} />
                <TextInput style={styles.input} placeholder='Confirm Password..' secureTextEntry={showconfirmpassword === false ? true : false}
                    onFocus={() => {
                        setEmailfocus(false);
                        setPasswordfocus(false);
                        setConfirmpasswordfocus(true);
                    }}
                    onChangeText={(text) => setConfirmpassword(text)}
                    value={confirmpassword}
                />
                <Octicons name={showconfirmpassword === false ? 'eye-closed' : 'eye'} size={24} color="black" onPress={
                    () => { setShowconfirmpassword(!showconfirmpassword) }
                } style={{ position: 'absolute', right: 10, marginRight: 5 }} />
            </View>
            <TouchableOpacity style={styles.btn1} onPress={() => handelforget()}>
                <Text style={styles.btntxt}>Update</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Forgetpassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
        paddingHorizontal: 20, // Adjust horizontal spacing
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'purple',
        textAlign: 'center',
    },
    inputout: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: '90%',
        marginVertical: 10,
        elevation: 20,
    },
    input: {
        fontSize: 20,
        marginleft: 10,
        width: '100%',
    },
    btn1: {
        width: '90%', // Reduced width to fit better on smaller screens
        height: 50, // Fixed height for uniform buttons
        backgroundColor: 'red',
        borderRadius: 10, // Reduced radius for cleaner edges
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, // Added spacing from above components
        marginBottom: 10,
        elevation: 5, // Reduced shadow intensity for a sleeker look
    },
    btntxt: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    }
})