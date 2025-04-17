import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil';
import Loginscreen from '../src/loginsignupscreen/loginscreen';
import Welcomescreen from '../src/loginsignupscreen/welcomescreen';
import Signupscreen from '../src/loginsignupscreen/signupscreen';
import Homescreen from '../src/homescreen';
import Product from '../src/product';
import Wishlist from '../src/wishlist';
import Cart from '../src/cart';
import Foregetpassword from '../src/loginsignupscreen/forgetpassword';
import Updateprofile from '../src/updateprofile';
import Checkout from '../src/checkout';
import Orderpage from '../src/orderpage';
import Orders from '../src/orders';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <RecoilRoot>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcomescreen'>
            <Stack.Screen name="Welcomescreen" component={Welcomescreen} options={{ headerShown: false }} />
            <Stack.Screen name="Loginscreen" component={Loginscreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signupscreen" component={Signupscreen} options={{ headerShown: false }} />
            <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
            <Stack.Screen name="product" component={Product} options={{ headerShown: false }} />
            <Stack.Screen name="wishlist" component={Wishlist} options={{ headerShown: false }} />
            <Stack.Screen name="cart" component={Cart} options={{ headerShown: false }} />
            <Stack.Screen name="forgetpassword" component={Foregetpassword} options={{ headerShown: false }} />
            <Stack.Screen name="update" component={Updateprofile} options={{ headerShown: false }} />
            <Stack.Screen name="checkout" component={Checkout} options={{ headerShown: false }} />
            <Stack.Screen name="orderpage" component={Orderpage} options={{ headerShown: false }} />
            <Stack.Screen name="orders" component={Orders} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </RecoilRoot>
  )
}

export default index
