import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { myip } from '@/myip';
import Sidebar from '../sidebar';

const Topnavigation = ({ navigation }) => {

    // hook to store accesstkn
    const [accesstkn, setAccesstkn] = useState('');

    // function to get the access token
    async function Token() {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (token) {
                setAccesstkn(token);
                Alert.alert("Message ",accesstkn);
            } else {
                console.log("No Token found");
            }
        } catch (error) {
            console.error('Error retrieving token', error);
        }
    }

    // by using useEffect we get accesstkn
    useEffect(() => {
        Token()
    }, []);

    handlelogout = () => {
        const api_url = `${myip}/logout.php`;

        const formdata = new FormData();
        formdata.append('atkn', accesstkn);
        formdata.append('logout', true);

        axios.post(`${api_url}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === 'success') {
                    Alert.alert('Message', "Logout successfully....");
                    SecureStore.deleteItemAsync('authToken');
                    SecureStore.deleteItemAsync('user');
                    navigation.navigate('Loginscreen');
                } else {
                    Alert.alert("Problem in Logout...");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // hook to control when sidebar is open and when it is close
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <View style={styles.container}>
            <Fontisto name="nav-icon-list-a" size={30} style={styles.myicon} onPress={() => setSidebarOpen(true)} />
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} navigation={navigation} />
            <View style={styles.containerin}>
                <Text style={styles.mytext}>Ecommerce</Text>
                <Entypo name="shopping-bag" size={30} style={styles.myicon} />
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity>
                    <FontAwesome name="user-circle" size={30} style={styles.myicon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={() => handlelogout()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Topnavigation

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    containerin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    myicon: {
        color: 'red',
        marginLeft: 5,
    },
    mytext: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
})
