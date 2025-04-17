import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import user from '../assets/images/user.png';
import icon from '../assets/images/arrow.png';
import * as SecureStore from 'expo-secure-store';

const Sidebar = ({ open, setOpen, navigation }) => {

    // hook to store data of looged in person that we get from AsyncStorage
    const [uservalue, setUservalue] = useState([]);

    // useEffect used to get user data.
    useEffect(() => {
        // function to get user data who are logged in at that time.
        async function userdata() {
            try {
                const user = await SecureStore.getItemAsync('user');
                if (user) {
                    const parsedUser = JSON.parse(user); // Parse the string into an array
                    console.log("Fetched User Parsed Data: ", parsedUser);
                    setUservalue(parsedUser);
                } else {
                    console.log("No User found");
                }
            } catch (error) {
                console.error('Error retrieving in Userdata', error);
            }
        }
        userdata();
    }, [user]);

    // data that shows below
    const menudata = [
        {
            'id': 1,
            'title': 'UpdateProfile',
            'icon': require('../assets/images/update.png'),
        },
        {
            'id': 2,
            'title': 'Chat',
            'icon': require('../assets/images/chat1.png'),
        },
        {
            'id': 3,
            'title': 'Notification',
            'icon': require('../assets/images/notification.png'),
        },
        {
            'id': 4,
            'title': 'Settings',
            'icon': require('../assets/images/setting.png'),
        },
        {
            'id': 5,
            'title': 'Close',
            'icon': require('../assets/images/close.png'),
        },
    ];

    return (
        <View style={styles.container}>
            <Modal isVisible={open} backdropOpacity={0.4} animationIn={'slideInLeft'} animationOut={'slideOutLeft'}>
                <View style={styles.modal}>
                    <View style={styles.modalin}>
                        <View style={styles.modalinin}>
                            <FlatList
                                data={menudata}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={styles.display} onPress={() => {
                                            if (item.title === 'Close') {
                                                setOpen(false); // Close the modal
                                            }
                                            else if (item.title === 'UpdateProfile') {
                                                navigation.navigate('update');
                                            }
                                        }}>
                                            <Image source={item.icon} style={{ height: 30, width: 30 }} />
                                            <Text style={{ marginLeft: 15, fontSize: 20 }}>{item.title}</Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.modalstructure}>
                        <View style={styles.modalstructurein}>
                            <View style={styles.modalstructureinin}>
                                <Image source={user} style={styles.logo} />
                                <View style={{ marginLeft: 20 }}>
                                    {uservalue.length > 0 ? (
                                        <>
                                            <Text style={styles.userText}>{uservalue[1]}</Text>
                                            <Text style={styles.userText}>{uservalue[3]}</Text>
                                        </>
                                    ) : (
                                        <Text style={styles.userText}>No user data available</Text>
                                    )}
                                </View>
                            </View>
                            <Image source={icon} style={styles.icon} />
                        </View>
                        <View style={styles.modalstructuretriangle}>
                            <View style={styles.lefttriangle}></View>
                            <View style={styles.righttriangle}></View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Sidebar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalin: {
        width: '80%',
        height: '95%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalinin: {
        marginTop: 200,
    },
    modalstructure: {
        width: '100%',
        height: 120,
        position: 'absolute',
        top: 100,
    },
    modalstructurein: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: '#ffe5b0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 3,
        borderColor: 'orange'
    },
    modalstructureinin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalstructuretriangle: {
        width: '100%',
        marginTop: -3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lefttriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 23,
        borderRightWidth: 23,
        borderBottomWidth: 23,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'orange',
        transform: [{ rotate: '45deg' }],
    },
    righttriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 23,
        borderRightWidth: 23,
        borderBottomWidth: 23,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'orange',
        transform: [{ rotate: '-45deg' }],
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    userText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    icon: {
        width: 24,
        height: 24,
    },
    display: {
        width: '90%',
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        borderBottomWidth: 4,
        borderBottomColor: 'gray',
    }
})
