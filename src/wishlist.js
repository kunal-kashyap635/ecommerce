import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { myip } from '@/myip';
import { useRecoilState } from 'recoil';
import { wishlist } from '../atom/reciolatom';

const Wishlist = () => {

    // Recoil hook to use data store for globally purpose.
    const [wishlistitem, setWishlistitem] = useRecoilState(wishlist);

    // Function to handle deletion of an item
    const handleDelete = (itemId) => {
        // Filter out the item with the given ID from the wishlist
        const updatedWishlist = wishlistitem.filter((item) => item.id !== itemId);
        setWishlistitem(updatedWishlist);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Wishlist</Text>
            {wishlistitem.length > 0 ? (
                <FlatList
                    data={wishlistitem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemContainer}>
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: `${myip}/upload/${item?.product_image}` }}
                                    style={styles.productImage}
                                />
                                <Text style={styles.productTitle}>{item?.product_name || "Unknown Product"}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.mrpText}>MRP : ₹{item?.product_mrp || "--"}/-</Text>
                                    <Text style={styles.priceText}>₹{item?.product_rate || "--"}/-</Text>
                                </View>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)} >
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.emptyText}>Your wishlist is empty.</Text>
            )}
        </View>
    );
};

export default Wishlist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f5',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
        marginVertical: 5,
    },
    itemContainer: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 240,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mrpText: {
        fontSize: 16,
        color: '#999',
        textDecorationLine: 'line-through',
        marginRight: 10,
    },
    priceText: {
        fontSize: 18,
        color: '#ff5722',
        fontWeight: 'bold',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#ff5722',
        borderRadius: 5,
        padding: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        color: '#777',
    },
});