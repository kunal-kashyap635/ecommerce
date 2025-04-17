import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { myip } from '@/myip';

const Signupscreen = ({ navigation }) => {

    // hook for showing different color on input field
    const [namefocus, setNamefocus] = useState(false);
    const [emailfocus, setEmailfocus] = useState(false);
    const [phonefocus, setPhonefocus] = useState(false);
    const [addfocus, setAddfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);

    // hook to store the data.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    // hook for showing next screen.
    const [nextscreen, setNextscreen] = useState(null);

    // function to send the data to the server.
    const handelregister = () => {
        const api_url = `${myip}/register.php`;

        if (name == '') {
            alert('Name is required');
            return;
        }

        else if (email == '') {
            alert('Email is required');
            return;
        }

        else if (phone == '' || phone.length < 10) {
            alert('Phone is required & have atleast 10 digits');
            return;
        }

        else if (address == '') {
            alert('Address is required');
            return;
        }

        else if (password == '' || password.length < 6) {
            alert('Password is required & have atleast 6 characters');
            return;
        }

        else {
            const formdata = new FormData();
            formdata.append('name', name);
            formdata.append('email', email);
            formdata.append('phone', phone);
            formdata.append('address', address);
            formdata.append('password', password);

            axios.post(`${api_url}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status === 'success') {
                        alert('Registration Successfull...');
                        setName('');
                        setEmail('');
                        setPhone('');
                        setAddress('');
                        setPassword('');
                        setNextscreen('User Created Successfully...!');
                    } else {
                        alert('Invalid data...');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <View>
            {nextscreen == null ?
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.head1}>SIGN UP</Text>

                        <View style={styles.inputout}>
                            <FontAwesome6 name="person" size={30} color={namefocus === true ? 'red' : 'grey'} />
                            <TextInput style={styles.input} placeholder='Name..' onFocus={() => {
                                setNamefocus(true)
                                setEmailfocus(false);
                                setPhonefocus(false);
                                setAddfocus(false);
                                setPasswordfocus(false);
                            }}
                                onChangeText={(text) => setName(text)}
                                value={name}
                            />
                        </View>

                        <View style={styles.inputout}>
                            <Entypo name="email" size={30} color={emailfocus === true ? 'red' : 'grey'} />
                            <TextInput style={styles.input} placeholder='Email..' onFocus={() => {
                                setNamefocus(false)
                                setEmailfocus(true);
                                setPhonefocus(false);
                                setAddfocus(false);
                                setPasswordfocus(false);
                            }}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                            />
                        </View>

                        <View style={styles.inputout}>
                            <Feather name="smartphone" size={30} color={phonefocus === true ? 'red' : 'grey'} />
                            <TextInput style={styles.input} placeholder='Phone..' onFocus={() => {
                                setNamefocus(false);
                                setEmailfocus(false);
                                setPhonefocus(true);
                                setAddfocus(false);
                                setPasswordfocus(false);
                            }}
                                onChangeText={(text) => setPhone(text)}
                                value={phone}
                            />
                        </View>

                        <View style={styles.inputout}>
                            <FontAwesome6 name="address-card" size={30} color={addfocus === true ? 'red' : 'grey'} />
                            <TextInput style={styles.input} placeholder='Address..' onFocus={() => {
                                setNamefocus(false);
                                setEmailfocus(false);
                                setPhonefocus(false);
                                setAddfocus(true)
                                setPasswordfocus(false);
                            }}
                                onChangeText={(text) => setAddress(text)}
                                value={address}
                            />
                        </View>

                        <View style={styles.inputout}>
                            <Entypo name="lock" size={30} color={passwordfocus === true ? 'red' : 'grey'} />
                            <TextInput style={styles.input} placeholder='Password..' secureTextEntry={showpassword === false ? true : false}
                                onFocus={() => {
                                    setNamefocus(false)
                                    setEmailfocus(false);
                                    setPhonefocus(false);
                                    setAddfocus(false)
                                    setPasswordfocus(true);
                                }}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            />
                            <Octicons name={showpassword === false ? 'eye-closed' : 'eye'} size={24} color="black" onPress={
                                () => { setShowpassword(!showpassword) }
                            } style={{ position: 'absolute', right: 10, marginRight: 5 }} />
                        </View>

                        <TouchableOpacity style={styles.btn1} onPress={() => handelregister()}>
                            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Sign Up</Text>
                        </TouchableOpacity>

                        <Text style={styles.or}>OR</Text>
                        <Text style={styles.gftxt}>Sign Up With</Text>

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

                        <Text>Already Have An Account ?
                            <Text style={styles.signup} onPress={() => navigation.navigate('Loginscreen')}> Log In</Text>
                        </Text>
                    </View>
                </ScrollView> :
                <View style={styles.container1}>
                    <Text style={styles.successmessage}>{nextscreen}</Text>
                    <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('Loginscreen')}>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }} >Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn1} onPress={() => setNextscreen(null)}>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default Signupscreen

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
        marginVertical: 5,
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
        fontSize: 18,
        marginleft: 10,
        width: '100%',
        height: 40,
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
    or: {
        color: 'gray',
        marginTop: 10,
        fontWeight: 'bold',
    },
    gftxt: {
        marginVertical: 5,
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
    },
    container1: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successmessage: {
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
})