import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View, ToastAndroid, ActivityIndicator } from 'react-native'

import { Colors } from '../../assets'
import Menu from '../../components/menu'
import Gap from '../../components/gap'
import { XOKLIN_ENDPOINT, XOKLIN_URL } from '@env'
import formatGreeting from '../../utils/formatGreeting'
import CardActiveOrder from '../../components/card-active-order'
import { formatStatus } from '../../utils/formatStatus'

const AdminHome = () => {
  const { userData } = useSelector(state => state.UserReducer)

  const navigation = useNavigation()

  const [dataOrders, setDataOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOngoingOrder = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/orders?status=ongoing`, header)
      if (response.status === 200) {
        setDataOrders(response.data?.data)
      }
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      if (e.response.data?.message) {
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
      }
    }
  }

  const navigateToOrderDetail = async (orderDetail) => {
    navigation.navigate({ name: 'AdminOrderDetail', params: { orderDetail } })
  }

  useEffect(() => {
    fetchOngoingOrder()
  }, [])

  return (
    <ScrollView style={styles.page}>
      <ImageBackground source={require('../../assets/images/bg_admin_home.png')} style={styles.header}>
        <Text style={styles.titleHeader}>{formatGreeting()}</Text>
        <Text style={styles.subtitleHeader}>{userData.fullname}</Text>
      </ImageBackground>
      <View style={styles.containerMenus}>
        <Text style={styles.titleMenus}>Let's book a laundry service today!</Text>
        <Gap height={24}/>
        <View style={styles.menus}>
          <Menu
            label='Orders'
            image={require('../../assets/images/logo_small.png')}
            onPress={() => navigation.navigate('AdminOrders')}
          />
          <Gap width={16} />
          <Menu
            label='Item Management'
            image={require('../../assets/images/icon_item_management.png')}
            onPress={() => navigation.navigate('ItemManagement')}
          />
        </View>
        <Gap height={24}/>
        <View style={styles.menus}>
          <Menu
            label='Create User'
            image={require('../../assets/images/icon_add_user.png')}
            onPress={() => navigation.navigate('CreateUser')}
          />
          <Gap width={16} />
          <Menu
            label='User Management'
            image={require('../../assets/images/icon_user_management.png')}
            onPress={() => navigation.navigate('UserManagement')}
          />
        </View>
        <Gap height={24}/>
        <View style={styles.menus}>
          {/* <Menu
            label='Report'
            image={require('../../assets/images/icon_report.png')}
            onPress={() => navigation.navigate('Report')}
          />
          <Gap width={16} /> */}
          <Menu
            label='Profile'
            image={require('../../assets/images/icon_profile.png')}
            onPress={() => navigation.navigate('AdminProfile')}
          />
          <Gap width={16} />
          <View style={styles.spacer} />
        </View>
      </View>
      <View style={styles.containerActiveOrders}>
        <Text style={styles.titleActiveOrders}>Active Orders</Text>
        <Gap height={16}/>
        {isLoading
          ? (
            <View style={styles.containerLoading}>
              <ActivityIndicator size='large' />
              <Text style={styles.textLoading}>Loading...</Text>
            </View>
          )
          : (
            dataOrders.length > 0
              ? (
                <View>
                  <CardActiveOrder
                    image={{ uri: `${XOKLIN_URL}${dataOrders[0].order[0].iconUrl}` }}
                    id={dataOrders[0].idOrder}
                    orders={dataOrders[0].User.fullname}
                    status={formatStatus(dataOrders[0].status)}
                    onPress={() => navigateToOrderDetail(dataOrders[0])}
                  />
                  {dataOrders.length > 1 && (
                    <CardActiveOrder
                      image={{ uri: `${XOKLIN_URL}${dataOrders[1].order[1].iconUrl}` }}
                      id={dataOrders[1].idOrder}
                      orders={dataOrders[1].User.fullname}
                      status={formatStatus(dataOrders[1].status)}
                      onPress={() => navigateToOrderDetail(dataOrders[1])}
                    />
                  )}
                </View>
              )
              : (
                <Text>There are no active orders right now.</Text>
              )
          )}
      </View>
    </ScrollView>
  )
}

export default AdminHome

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f2f2f2'
  },
  header: {
    height: 256,
    padding: 24
  },
  titleHeader: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: Colors.white
  },
  subtitleHeader: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.white
  },
  containerMenus: {
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  menus: {
    flexDirection: 'row'
  },
  titleMenus: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.black
  },
  containerActiveOrders: {
    padding: 16
  },
  titleActiveOrders: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: Colors.black
  },
  spacer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  containerLoading: {
    alignItems: 'center'
  },
  textLoading: {
    marginTop: 2,
    fontSize: 10,
    color: Colors.textGrayLight
  }
})
