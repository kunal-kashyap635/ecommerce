import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRecoilState } from 'recoil';
import { wishlist } from '../../atom/reciolatom';
import axios from 'axios';
import { myip } from '@/myip';


const Cartdata = ({ navigation }) => {

  // hook to store backend response
  const [prod, setProd] = useState([]);

  // Recoil hook to store data which used for globally purpose.
  const [wishlistitem, setWishlistitem] = useRecoilState(wishlist);

  // Toggle wishlist item
  const toggleWishlist = (item) => {
    setWishlistitem((prevWishlist) => {
      const isInWishlist = prevWishlist.some((wishlistItem) => wishlistItem.id === item.id);
      if (isInWishlist) {
        Alert.alert("Wishlist", `${item.product_name} has been removed from your wishlist.`);
        return prevWishlist.filter((wishlistItem) => wishlistItem.id !== item.id);
      }
      Alert.alert("Wishlist", `${item.product_name} has been added to your wishlist.`);
      return [...prevWishlist, item];
    });
  };

  // backend api url
  const api_url = `${myip}/getproduct.php`;
  useEffect(() => {
    axios.post(`${api_url}`)
      .then(response => {
        // console.log(response);  // In response there is key i.e data and data value is array of objects.
        // console.log(response.data); 
        setProd(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  // console.log(prod);

  const handleproduct = (item) => {
    // console.log(item);
    navigation.navigate('product', item)
  }

  return (
    <View>
      <FlatList
        data={prod}
        keyExtractor={(item) => item.id}
        numColumns={2}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleproduct(item)}>

            <TouchableOpacity style={styles.heartIcon} onPress={() => toggleWishlist(item)}>
              <AntDesign name={wishlistitem.some((listItem) => listItem.id === item.id) ? "heart" : "hearto"} size={20} color="red" />
            </TouchableOpacity>

            <View style={styles.imgcontainer}>
              <Image source={{ uri: `${myip}/upload/${item.product_image}` }} style={styles.productImage} />
            </View>
            <Text style={styles.productTitle}>{item.product_name}</Text>
            <Text style={styles.mrpText}>MRP : ₹{item.product_mrp}/-</Text>
            <Text style={styles.priceText}>₹{item.product_rate}/-</Text>
            <View style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Cartdata

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  imgcontainer: {
    width: '100%',
    height: 170,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginVertical: 10,
  },
  productTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
    marginVertical: 10,
  },
  mrpText: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff5722',
    textAlign: 'center',
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});