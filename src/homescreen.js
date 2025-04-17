import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Topnavigation from '../src/component/topnavigation';
import Headnavigation from '../src/component/headnavigation';
import Category from '../src/component/category';
import Cartdata from '../src/component/cartslider';
import Bottomnav from '../src/component/bottomnav';

const Homescreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
            <Topnavigation navigation={navigation} />
            <Headnavigation />
            <Category />
            <Cartdata navigation={navigation} />
            <Bottomnav style={styles.bottomnav} navigation={navigation} />
        </ScrollView>
    )
}

export default Homescreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        zIndex: 20,
    },
})