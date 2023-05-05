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
import UserViewLocation from './user/view-location'
import Cart from './user/cart'
import UserOrderDetail from './user/order-detail'
import AdminHome from './admin/home'
import AdminProfile from './admin/profile'
import ItemManagement from './admin/item-management'
import CreateUser from './admin/create-user'
import UserManagement from './admin/user-management'
import Report from './admin/report'
import AdminOrders from './admin/orders'
import AdminViewLocation from './admin/view-location'
import AdminOrderDetail from './admin/order-detail'
import AdminEditProfile from './admin/edit-profile'
import UserEditProfile from './user/edit-profile'
import AddItem from './admin/item-add'
import ItemManagementDetail from './admin/item-management-detail'
import UserManagementDetail from './admin/user-management-detail'

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
          name='UserEditProfile'
          component={UserEditProfile}
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
          component={UserViewLocation}
        />
        <Stack.Screen
          name='UserOrderDetail'
          component={UserOrderDetail}
        />
        {/* admin */}
        <Stack.Screen
          name='AdminHome'
          component={AdminHome}
        />
        <Stack.Screen
          name='AdminOrders'
          component={AdminOrders}
        />
        <Stack.Screen
          name='AdminOrderDetail'
          component={AdminOrderDetail}
        />
        <Stack.Screen
          name='ItemManagement'
          component={ItemManagement}
        />
        <Stack.Screen
          name='AddItem'
          component={AddItem}
        />
        <Stack.Screen
          name='ItemManagementDetail'
          component={ItemManagementDetail}
        />
        <Stack.Screen
          name='CreateUser'
          component={CreateUser}
        />
        <Stack.Screen
          name='UserManagementDetail'
          component={UserManagementDetail}
        />
        <Stack.Screen
          name='UserManagement'
          component={UserManagement}
        />
        <Stack.Screen
          name='Report'
          component={Report}
        />
        <Stack.Screen
          name='AdminProfile'
          component={AdminProfile}
        />
        <Stack.Screen
          name='AdminEditProfile'
          component={AdminEditProfile}
        />
        <Stack.Screen
          name='AdminViewLocation'
          component={AdminViewLocation}
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
        navigation.reset({ index: 0, routes: [{ name: 'AdminHome' }] })
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
