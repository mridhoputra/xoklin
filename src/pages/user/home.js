import React from 'react'
import moment from 'moment'
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../assets'
import Menu from '../../components/menu'
import Gap from '../../components/gap'
import CardActiveOrder from '../../components/card-active-order'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const UserHome = () => {
  const { userData } = useSelector(state => state.UserReducer)

  const navigation = useNavigation()

  const formatGreeting = () => {
    const currentHour = moment().format('HH')
    if (currentHour >= 5 && currentHour < 11) {
      return 'Good Morning,'
    } else if (currentHour >= 11 && currentHour < 15) {
      return 'Good Afternoon,'
    } else if (currentHour >= 15 && currentHour < 18) {
      return 'Good Afternoon,'
    } else if (currentHour >= 18 || currentHour < 5) {
      return 'Good Evening,'
    } else {
      return 'Hello'
    }
  }

  return (
    <ScrollView style={styles.page}>
      <ImageBackground source={require('../../assets/images/bg_user_home.png')} style={styles.header}>
        <Text style={styles.titleHeader}>{formatGreeting()}</Text>
        <Text style={styles.subtitleHeader}>{userData.fullname}</Text>
      </ImageBackground>
      <View style={styles.containerMenus}>
        <Text style={styles.titleMenus}>Let's book a laundry service today!</Text>
        <Gap height={24}/>
        <View style={styles.menus}>
          <Menu
            label='Make an order'
            image={require('../../assets/images/logo_small.png')}
            onPress={() => navigation.navigate('UserChooseLocation')}
          />
          <Gap width={16} />
          <Menu
            label='Order History'
            image={require('../../assets/images/icon_order_history.png')}
            onPress={() => navigation.navigate('UserOrderHistory')}
          />
        </View>
        <Gap height={24}/>
        <View style={styles.menus}>
          <Menu
            label='Cart'
            image={require('../../assets/images/icon_cart.png')}
            onPress={() => navigation.navigate('UserCart')}
          />
          <Gap width={16} />
          <Menu
            label='Profile'
            image={require('../../assets/images/icon_profile.png')}
            onPress={() => navigation.navigate('UserProfile')}
          />
        </View>
      </View>
      <View style={styles.containerActiveOrders}>
        <Text style={styles.titleActiveOrders}>Active Orders</Text>
        <Gap height={16}/>
        <CardActiveOrder
          image={require('../../assets/images/icon_shirt.png')}
          id='#102452'
          orders='2x Shirt, 1x T-Shirt'
          status='Ongoing'
        />
        <CardActiveOrder
          image={require('../../assets/images/icon_tshirt.png')}
          id='#102453'
          orders='2kg of total weight'
          status='Ongoing'
        />
      </View>
    </ScrollView>
  )
}

export default UserHome

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
  }
})
