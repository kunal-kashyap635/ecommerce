import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import { myip } from '@/myip';

const Checkout = ({ navigation, route }) => {

  // getting totalamount through route
  const totalamount = route?.params?.orderamount;

  // getting order id which generated during order through route
  const orderid = route?.params?.orderid;

  // hook to store user value 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // useEffect is used to get user information
  useEffect(() => {
    async function userdata() {
      try {
        const user = await SecureStore.getItemAsync('user');
        // console.log("user is ", user);
        if (user) {
          const parsedUser = JSON.parse(user);
          // console.log("parsed user is", parsedUser);
          setName(parsedUser[1] || '');
          setEmail(parsedUser[2] || '');
          setPhone(parsedUser[3] || '');
          setAddress(parsedUser[4] || '');
        }
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    }
    userdata();
  }, []);

  // this function opens the Razorpay payment gateway
  const handleCheckout = () => {
    var options = {
      description: 'Shipkart consultation',
      image: 'https://cdn1.iconfinder.com/data/icons/andriod-app-logo/32/icon_flipkart-512.png',
      currency: 'INR',
      key: 'rzp_test_E3GOhpUxaH16Is',
      amount: totalamount,
      name: 'ShipKart',
      order_id: orderid,
      prefill: {
        email: email,
        contact: phone,
        name: name
      },
      theme: { color: '#53a20e' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      console.log("Razoppay data is ", data);

      const api_url = `${myip}/payment.php`;

      const formdata = new FormData();
      formdata.append('rzp_orderid', data.razorpay_order_id);
      formdata.append('rzp_paymentid', data.razorpay_payment_id);
      formdata.append('rzp_signature', data.razorpay_signature);

      axios.post(`${api_url}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 'success') {
            Alert.alert("✅ Order Placed!", "Thank you for your purchase!");
            setTimeout(() => {
              navigation.navigate('orderpage',{
                orderid : response.data.oid
              })
            }, 5000);
          }
        })
        .catch((error) => {
          console.log(error);
        })

    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  };

  return (
    <LinearGradient colors={['#ff9a9e', '#fad0c4']} style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.card}>
        <Text style={styles.label}>👤 Name: {name}</Text>
        <Text style={styles.label}>📧 Email: {email}</Text>
        <Text style={styles.label}>📞 Phone: {phone}</Text>
        <Text style={styles.label}>🏠 Address: {address}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={() => handleCheckout()}>
        <LinearGradient colors={['#ff8c00', '#ff4500']} style={styles.buttonGradient}>
          <Text style={styles.checkoutText}>💰 Pay ₹ {totalamount / 100}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );

}

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '90%',
    marginBottom: 20,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});