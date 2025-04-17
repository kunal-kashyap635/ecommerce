import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRecoilState } from 'recoil';
import { cartdata , totalamount , totalitems , cartcount } from '../atom/reciolatom';
import { myip } from '@/myip';
import axios from 'axios';

const Product = ({ navigation, route }) => {
  const product = route.params;
  // console.log(product);

  // recoil hook to store data so we use data globally in any component
  const [cart,setCart] = useRecoilState(cartdata);
  const [amt,setAmt] = useRecoilState(totalamount);
  const [items,setItems] = useRecoilState(totalitems);
  const [count,setCount] = useRecoilState(cartcount)

  // hook to set dynamic color changes
  const [selectedColor, setSelectedColor] = useState("red");
  const colors = ["red", "blue", "green", "yellow", "black", "white"];

  // function to show color buttons
  const renderColors = () => {
    return (
      <View style={styles.colorSection}>
        <Text style={styles.colorLabel}>Color: <Text style={styles.colorValue}>{selectedColor}</Text></Text>
        <View style={styles.colorContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                {
                  backgroundColor: color,
                  borderWidth: selectedColor === color ? 2 : 0,
                  borderColor: selectedColor === color ? '#000' : '#ccc',
                }
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>
    )
  }

  // hook to dynamically see changes in quantity and price
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(parseInt(product.product_rate));

  // Function to handle quantity change
  const changeQuantity = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
      setTotalPrice((quantity + 1) * parseInt(product.product_rate));
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice((quantity - 1) * parseInt(product.product_rate));
    }
  };

  // hook to store accesstkn
  const [accesstkn, setAccesstkn] = useState('');

  // function getting accesstoken
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

  // function to send the data on PHP server
  const handelcart = () => {
    const api_url = `${myip}/addtocart.php`;

    const formdata = new FormData();
    formdata.append('ctkn', accesstkn);
    formdata.append('pid', product.id);
    formdata.append('qty', quantity);

    axios.post(`${api_url}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 'success') {
          Alert.alert("Mesaage", "Product Added In Cart....");
          setCart(response.data.cartdata);
          setAmt(response.data.amt);
          setItems(response.data.item);
          setCount((prevcount) => prevcount + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[product]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: `${myip}/upload/${item.product_image}` }} style={styles.productImage} />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.productDesc}>{item.product_desc}</Text>
              <View style={styles.priceInfo}>
                <Text style={styles.productPrice}>₹ {item.product_rate}/-</Text>
                <Text style={styles.productMPR}>MRP ₹ {item.product_mrp}/-</Text>
              </View>
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>Dis {item.discount} %</Text>
              </View>
            </View>
          </View>
        )}
      />
      {/* {renderColors()} */}
      {
        (product.category === "Clothes" || product.category === "Shoes") ? renderColors() : <Text style={styles.colorValue}>No Color Feature is Available For this Category</Text>
      }

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => changeQuantity('decrease')} style={styles.quantityButton}>
          <Text style={styles.decrease}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => changeQuantity('increase')} style={styles.quantityButton}>
          <Text style={styles.increase}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalPrice}>Price: ₹{totalPrice}</Text>

      <TouchableOpacity style={styles.addToCartButton} onPress={() => handelcart()}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 2,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    // backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    borderRadius: 16,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productDesc: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#777',
    marginBottom: 16,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f08a5d',
  },
  productMPR: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  discountContainer: {
    backgroundColor: '#ff5733', // Bright background color for visibility
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 16,
    alignSelf: 'center', // Center it at the bottom
    marginBottom: 16,
    width: '90%',
  },
  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    padding: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrease: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f08a5d',
  },
  quantity: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
  },
  increase: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f08a5d',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#f08a5d',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  colorSection: {
    marginVertical: 5,
    alignItems: 'flex-start', // Align label to the left
  },
  colorLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  colorValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // Highlight the selected color value
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align circles to the left
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
})
