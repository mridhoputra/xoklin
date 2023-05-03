import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../assets'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import Gap from '../../components/gap'
import AdminOrderOngoing from './order-ongoing'
import AdminOrderCompleted from './order-completed'
import AdminOrderCancelled from './order-cancelled'

const Tab = createMaterialTopTabNavigator()

const AdminOrders = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>ORDERS</Text>
        <Gap width={10} />
      </View>
      <Tab.Navigator
        style={styles.tabNavigatorStyle}
        screenOptions={{
          tabBarPressColor: 'transparent',
          tabBarStyle: styles.tabBarStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarContentContainerStyle: styles.tabBarContentContainerStyle,
          tabBarInactiveTintColor: Colors.textGray,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle
        }}
      >
        <Tab.Screen
          name='OngoingTab'
          component={AdminOrderOngoing}
          options={{
            tabBarLabel: 'Ongoing',
            tabBarIcon: ({ focused }) => (
              focused
                ? <Image source={require('../../assets/images/icon_ongoing_active.png')} style={styles.ongoingIcon}/>
                : <Image source={require('../../assets/images/icon_ongoing.png')} style={styles.ongoingIcon}/>
            )
          }}
        />
        <Tab.Screen
          name='CompletedTab'
          component={AdminOrderCompleted}
          options={{
            tabBarLabel: 'Completed',
            tabBarIcon: ({ focused }) => (
              focused
                ? <Image source={require('../../assets/images/icon_completed_active.png')} style={styles.completedCancelledIcon}/>
                : <Image source={require('../../assets/images/icon_completed.png')} style={styles.completedCancelledIcon}/>
            )
          }}
        />
        <Tab.Screen
          name='CancelledTab'
          component={AdminOrderCancelled}
          options={{
            tabBarLabel: 'Cancelled',
            tabBarIcon: ({ focused }) => (
              focused
                ? <Image source={require('../../assets/images/icon_cancelled_active.png')} style={styles.completedCancelledIcon}/>
                : <Image source={require('../../assets/images/icon_cancelled.png')} style={styles.completedCancelledIcon}/>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default AdminOrders

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 8
  },
  btnBack: {
    width: 10,
    height: 18
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.primary
  },
  tabNavigatorStyle: {
    marginHorizontal: 16
  },
  tabBarStyle: {
    elevation: 0
  },
  tabBarIconStyle: {
    justifyContent: 'center'
  },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontFamily: 'Nunito-Bold',
    fontSize: 14
  },
  tabBarContentContainerStyle: {
    flexDirection: 'row'
  },
  tabBarIndicatorStyle: {
    backgroundColor: Colors.primary,
    height: '100%',
    borderRadius: 8,
    opacity: 0.1
  },
  tabBarItemStyle: {
    flexDirection: 'row'
  },
  ongoingIcon: {
    width: 16,
    height: 12
  },
  completedCancelledIcon: {
    width: 20,
    height: 20
  }
})
