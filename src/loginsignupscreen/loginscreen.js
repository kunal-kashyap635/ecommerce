import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { myip } from '@/myip';

const Loginscreen = ({ navigation }) => {

    // hook for showing different colors on input field
    const [emailfocus, setEmailfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);

    //hook to store the data.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // hook to store the data in the secure store.
    const [authtoken, setAuthtoken] = useState('');

    // hook to store userid
    const [userdata, setUserdata] = useState('');

    // function to save auth token securely.
    const saveAuthToken = async (ctoken, cuser) => {
        try {
            const token = ctoken;
            const user = JSON.stringify(cuser);
            await SecureStore.setItemAsync('authToken', token);
            await SecureStore.setItemAsync('user', user);
            setAuthtoken(token);
            setUserdata(user);
            Alert.alert('Success', 'Authentication token saved securely!');

        } catch (error) {
            console.error('Error saving token', error);
            Alert.alert('Error', 'Failed to save authentication token');
        }
    };

    useEffect(() => {
        console.log(authtoken);
        console.log(userdata);
    }, [authtoken])

    // function to send the data to the server.
    const handellogin = () => {
        const api_url = `${myip}/login.php`;

        if (email == '') {
            alert('Email is required');
            return;
        }

        else if (password == '' || password.length < 6) {
            alert('Password is required & have atleast 6 characters');
            return;
        }

        else {
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
                        alert('Login Successfull...');
                        setEmail('');
                        setPassword('');
                        saveAuthToken(response.data.token, response.data.user);
                        navigation.navigate('Homescreen');
                    } else {
                        alert('Invalid Credentials...');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>LOG IN</Text>
            <View style={styles.inputout}>
                <Entypo name="email" size={30} color={emailfocus === true ? 'red' : 'grey'} />
                <TextInput style={styles.input} placeholder='Email..' onFocus={() => {
                    setEmailfocus(true);
                    setPasswordfocus(false);
                }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.inputout}>
                <Entypo name="lock" size={30} color={passwordfocus === true ? 'red' : 'grey'} />
                <TextInput style={styles.input} placeholder='Password..' secureTextEntry={showpassword === false ? true : false}
                    onFocus={() => {
                        setEmailfocus(false);
                        setPasswordfocus(true);
                    }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <Octicons name={showpassword === false ? 'eye-closed' : 'eye'} size={24} color="black" onPress={
                    () => { setShowpassword(!showpassword) }
                } style={{ position: 'absolute', right: 10, marginRight: 5 }} />
            </View>

            <TouchableOpacity style={styles.btn1} onPress={() => handellogin()}>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.forget} onPress={()=> navigation.navigate('forgetpassword')}>Forget Password..</Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.gftxt}>Sign In With</Text>

            <View style={styles.gf}>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <AntDesign name="google" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <Entypo name="facebook" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.hr80}></View>

            <Text>Don't have an account ?
                <Text style={styles.signup} onPress={() => navigation.navigate('Signupscreen')}> Sign Up</Text>
            </Text>
        </View>
    )
}

export default Loginscreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    head1: {
        fontSize: 40,
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
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
        height: 50,
        marginLeft: 10,
    },
    btn1: {
        width: '90%',
        height: 50,
        backgroundColor: 'red',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        color: 'white',
        marginBottom: 10,
    },
    forget: {
        color: 'gray',
        marginTop: 20,
        marginBottom: 10,
    },
    or: {
        color: 'gray',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    gftxt: {
        marginVertical: 10,
        color: 'black',
        fontSize: 25,
    },
    gf: {
        flexDirection: 'row',
    },
    gficon: {
        backgroundColor: 'white',
        width: 50,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 10,
    },
    hr80: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 15,
    },
    signup: {
        color: 'red'
    }
})
