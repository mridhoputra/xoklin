import { ToastAndroid, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native'
import { Colors } from '../assets'
import WelcomeScreen from './public/welcome-screen'
import Login from './public/login'
import Register from './public/register'
import UserHome from './user/home'
import UserOrderHistory from './user/order-history'
import ChooseLocation from './user/choose-location'
import ChooseItem from './user/choose-item'
import CartDetail from './user/cart-detail'
import UserProfile from './user/profile'
import ViewLocation from './user/view-location'
import Cart from './user/cart'
import UserOrderDetail from './user/order-detail'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName='RootNavigation'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name='RootNavigation'
          component={RootNavigation}
        />
        <Stack.Screen
          name='WelcomeScreen'
          component={WelcomeScreen}
        />
        <Stack.Screen
          name='Login'
          component={Login}
        />
        <Stack.Screen
          name='Register'
          component={Register}
        />
        <Stack.Screen
          name='UserHome'
          component={UserHome}
        />
        <Stack.Screen
          name='UserChooseLocation'
          component={ChooseLocation}
        />
        <Stack.Screen
          name='UserOrderHistory'
          component={UserOrderHistory}
        />
        <Stack.Screen
          name='UserCart'
          component={Cart}
        />
        <Stack.Screen
          name='UserProfile'
          component={UserProfile}
        />
        <Stack.Screen
          name='UserChooseItem'
          component={ChooseItem}
        />
        <Stack.Screen
          name='UserCartDetail'
          component={CartDetail}
        />
        <Stack.Screen
          name='UserViewLocation'
          component={ViewLocation}
        />
        <Stack.Screen
          name='UserOrderDetail'
          component={UserOrderDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

const RootNavigation = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const { isLogin, userData } = useSelector(state => state.UserReducer)

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', value: false })
  }, [])

  useEffect(() => {
    if (isLogin) {
      if (userData.role === 'ROLE_USER') {
        navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] })
      } else if (userData.role === 'ROLE_ADMIN' || userData.role === 'ROLE_SUPERADMIN') {
        navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] })
        ToastAndroid.show(userData.role, ToastAndroid.LONG)
      } else {
        ToastAndroid.show('ROLE NOT HANDLED', ToastAndroid.LONG)
      }
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] })
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
    </View>
  )
}

export default Navigation
