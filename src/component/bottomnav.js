import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRecoilState } from 'recoil';
import { cartcount, wishlistcount } from '../../atom/reciolatom';

const Bottomnav = ({ navigation }) => {

    // recoil hook to use store data which you store in product component.
    const [count, setCount] = useRecoilState(cartcount);
    // console.log('count looks like :- ', count);

    return (
        <View style={styles.container}>
            <View style={styles.btncon1}>
                <FontAwesome5 name="home" size={30} style={styles.icon1} />
            </View>
            <View style={styles.btncon2}>
            <FontAwesome6 name="box-open" size={30} color="black" style={styles.icon2} onPress={()=> navigation.navigate('orders')}/>
            </View>
            <View style={[styles.btncon1, { position: 'relative' }]}>
                <Entypo name="heart" size={30} style={styles.icon1} onPress={() => navigation.navigate('wishlist')} />
            </View>
            <View style={[styles.btncon1, { position: 'relative' }]}>
                <Entypo name="shopping-cart" size={30} style={styles.icon1} onPress={() => navigation.navigate('cart')} />
                {count > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{count}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default Bottomnav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: 'red',
        borderTopWidth: 2,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    icon1: {
        color: 'red',
    },
    icon2: {
        color: 'white',
    },
    btncon1: {
        backgroundColor: 'white',
        elevation: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -15,
        backgroundColor: 'red',
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    badge: {
        position: 'absolute',
        right: -10,
        top: -5,
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
})