import { View } from 'react-native'
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
          name='UserOrderHistory'
          component={UserOrderHistory}
        />
        <Stack.Screen
          name='UserChooseLocation'
          component={ChooseLocation}
        />
        <Stack.Screen
          name='UserChooseItem'
          component={ChooseItem}
        />
        <Stack.Screen
          name='UserCartDetail'
          component={CartDetail}
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

  console.log(isLogin)
  console.log(userData)

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', value: false })
  }, [])

  useEffect(() => {
    navigation.reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] })
  })

  //   useEffect(() => {
  //     if (isLogin) {
  //       if (userData) {
  //         if (userData.isProfileEdited) {
  //           if (userData.isEmployee) {
  //             if (userData.isAdmin || userData.isSuperAdmin) {
  //               navigation.reset({ index: 0, routes: [{ name: 'AdminNavigation' }] })
  //             } else {
  //               if (userData.isOperator || userData.isApprover || userData.isSigner) {
  //                 navigation.reset({ index: 0, routes: [{ name: 'AdminNavigation' }] })
  //               } else {
  //                 navigation.reset({ index: 0, routes: [{ name: 'UserNavigation' }] })
  //               }
  //             }
  //           } else {
  //             if (userData.isAdmin || userData.isSuperAdmin) {
  //               navigation.reset({ index: 0, routes: [{ name: 'AdminNavigation' }] })
  //             } else {
  //               navigation.reset({ index: 0, routes: [{ name: 'UserNavigation' }] })
  //             }
  //           }
  //         } else {
  //           navigation.reset({ index: 0, routes: [{ name: 'PublicNavigation', state: { routes: [{ name: 'ProfileAddCitizen' }] } }] })
  //         }
  //       } else {
  //         navigation.reset({ index: 0, routes: [{ name: 'PublicNavigation' }] })
  //       }
  //     } else {
  //       navigation.reset({ index: 0, routes: [{ name: 'PublicNavigation' }] })
  //     }
  //   }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
    </View>
  )
}

export default Navigation
