import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { myip } from '../myip';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Updateprofile = () => {

    // useEffect used to get user data.
    useEffect(() => {
        // function to get user data who are logged in at that time.
        async function userdata() {
            try {
                const user = await SecureStore.getItemAsync('user');
                console.log("User Data is: ", user);
                if (user) {
                    const parsedUser = JSON.parse(user); // Parse the string into an array
                    console.log("Fetched User Parsed Data is: ", parsedUser);
                    setName(parsedUser[1] || ''); 
                    setEmail(parsedUser[2] || '');
                    setPhone(parsedUser[3] || ''); 
                    setAddress(parsedUser[4] || '');
                } else {
                    console.log("No User found");
                }
            } catch (error) {
                console.error('Error retrieving in Userdata', error);
            }
        }
        userdata();
    }, []);

    // hook to toggle editability
    const [isEditable, setIsEditable] = useState(false);

    // hook for showing different color on input field
    const [namefocus, setNamefocus] = useState(false);
    const [emailfocus, setEmailfocus] = useState(false);
    const [phonefocus, setPhonefocus] = useState(false);
    const [addfocus, setAddfocus] = useState(false);

    // hook to store the data.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // function to send data to PHP backend server
    const handelupdate = () => {
        const api_url = `${myip}/updateprofile.php`;

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

        else {
            const formdata = new FormData();
            formdata.append('name', name);
            formdata.append('email', email);
            formdata.append('phone', phone);
            formdata.append('address', address);

            axios.post(`${api_url}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status === 'success') {
                        alert('Profile Updated Successfully...');
                        setName('');
                        setEmail('');
                        setPhone('');
                        setAddress('');
                        setIsEditable(false);
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
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.head1}>Udate Profile</Text>
                <View style={styles.inputout}>
                    <FontAwesome6 name="person" size={30} color={namefocus === true ? 'red' : 'grey'} />
                    <TextInput style={styles.input} placeholder='Name..' onFocus={() => {
                        setNamefocus(true)
                        setEmailfocus(false);
                        setPhonefocus(false);
                        setAddfocus(false);
                    }}
                        onChangeText={(text) => setName(text)}
                        value={name}
                        editable={isEditable}
                    />
                </View>

                <View style={styles.inputout}>
                    <Entypo name="email" size={30} color={emailfocus === true ? 'red' : 'grey'} />
                    <TextInput style={styles.input} placeholder='Email..' onFocus={() => {
                        setNamefocus(false)
                        setEmailfocus(true);
                        setPhonefocus(false);
                        setAddfocus(false);
                    }}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        editable={isEditable}
                    />
                </View>

                <View style={styles.inputout}>
                    <Feather name="smartphone" size={30} color={phonefocus === true ? 'red' : 'grey'} />
                    <TextInput style={styles.input} placeholder='Phone..' onFocus={() => {
                        setNamefocus(false);
                        setEmailfocus(false);
                        setPhonefocus(true);
                        setAddfocus(false);
                    }}
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                        editable={isEditable}
                    />
                </View>

                <View style={styles.inputout}>
                    <FontAwesome6 name="address-card" size={30} color={addfocus === true ? 'red' : 'grey'} />
                    <TextInput style={styles.input} placeholder='Address..' onFocus={() => {
                        setNamefocus(false);
                        setEmailfocus(false);
                        setPhonefocus(false);
                        setAddfocus(true)
                    }}
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                        editable={isEditable}
                    />
                </View>

                {! isEditable ? (
                    <TouchableOpacity style={styles.btn1} onPress={() => setIsEditable(true)}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Edit</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.btn1} onPress={() => handelupdate()}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Update</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    )
}

export default Updateprofile

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
})
