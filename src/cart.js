import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, StatusBar, TextInput, Alert } from 'react-native';
import { myip } from '@/myip';
import { useRecoilState } from 'recoil';
import { cartdata, totalamount, totalitems, cartcount } from '../atom/reciolatom';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const Cart = ({ navigation }) => {

    // recoil hook to use store data which you store in product component.
    const [cart, setCart] = useRecoilState(cartdata);
    const [amt, setAmt] = useRecoilState(totalamount);
    const [items, setItems] = useRecoilState(totalitems);
    const [count, setCount] = useRecoilState(cartcount);

    // console.log("cart data looks like :- ", cart);
    // console.log("cart data looks like :- ", Object.values(cart));
    // console.log("amount looks like :- ", amt);
    // console.log("item looks like :- ", items);

    // function to delete cart item.
    const handledelete = (id) => {
        const pid = id;
        const api_url = `${myip}/delete.php`;

        const formdata = new FormData();
        formdata.append('pid', pid);

        axios.post(`${api_url}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === 'success') {
                    setCart(response.data.cartdata);
                    setItems(response.data.item);
                    setAmt(response.data.amt);
                    setCount(Object.values(response.data.cartdata).length);
                    Alert.alert("Message", "Item Deleted Successfully....");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // function that changes quantity changes
    const handlequantitychange = (action, pid) => {

        const api_url = `${myip}/changequantity.php`;

        // console.log("action ", action);
        // console.log("product id ", pid);

        const formdata = new FormData();
        formdata.append('pid', pid);
        formdata.append('action', action);

        axios.post(`${api_url}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === 'success') {
                    setCart(response.data.cartdata);
                    setItems(response.data.item);
                    setAmt(response.data.amt);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    // hook to store accesstkn
    const [accesstkn, setAccesstkn] = useState('');

    // function to get the access token
    async function Token() {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (token) {
                setAccesstkn(token);
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


    // function to handel the order
    const handelorder = () => {

        const api_url = `${myip}/order.php`;
        const formdata = new FormData();
        formdata.append('ctkn', accesstkn);

        axios.post(`${api_url}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === 'success') {
                    setCart([]);  
                    setItems(0); 
                    setAmt(0);
                    setCount(0);
                    setTimeout(() => {
                        navigation.navigate('checkout',{
                            orderamount: response.data.orderamt,
                            orderid: response.data.orderid,
                        })
                    }, 2000);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Text style={styles.title}>YOUR CART</Text>
            <FlatList
                data={Object.values(cart)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: `${myip}/upload/${item.product_image}` }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.product_name}</Text>
                            <Text style={styles.productQuantity}>Quantity: {item.qty}</Text>
                            <Text style={styles.productPrice}>Rate: ₹{item.product_rate}/-</Text>
                            <Text style={styles.productTotal}>Total: ₹{item.amt}/-</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.button} onPress={() => handlequantitychange('increase', item.id)} >
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>

                            <TextInput
                                style={styles.inputField}
                                keyboardType="numeric"
                                value={String(item.qty)}
                                maxLength={4}
                            />

                            <TouchableOpacity style={styles.button} onPress={() => handlequantitychange('decrease', item.id)} >
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <AntDesign name="delete" size={25} color="white" onPress={() => handledelete(item.id)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )} />

            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total Items: {items}</Text>
                <Text style={styles.summaryText}>Total Amount: ₹{amt}</Text>
            </View>

            <TouchableOpacity style={styles.proceedButton} onPress={() => handelorder()}>
                <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
        marginVertical: 5,
    },
    cartItem: {
        flexDirection: 'column', // Change to column to stack items vertically
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    productImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginRight: 10,
        resizeMode: 'center',
    },
    productInfo: {
        flex: 1,
        justifyContent: 'space-evenly', // Distributes space evenly
        paddingRight: 10, // Adds spacing between text and buttons
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    productQuantity: {
        fontSize: 18,
        color: '#555',
    },
    productPrice: {
        fontSize: 18,
        color: '#555',
    },
    productTotal: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10, // Adds spacing between the product details and actions
        paddingVertical: 5,
    },
    button: {
        backgroundColor: '#ff6347',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginVertical: 4, // Adds spacing between buttons
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    inputField: {
        width: 40, // Adjust width and height for a square
        height: 40,
        borderWidth: 1, // Add border for clarity
        borderColor: '#ddd',
        borderRadius: 4,
        textAlign: 'center', // Align text to the center
        marginHorizontal: 3, // Add spacing around the input
        fontSize: 15,
    },
    summary: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        borderRadius: 8,
    },
    summaryText: {
        fontSize: 18,
        marginVertical: 4,
        fontWeight: 'bold',
        color: 'black',
    },
    proceedButton: {
        backgroundColor: '#28a745',
        padding: 16,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 15,
        alignItems: 'center',
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
