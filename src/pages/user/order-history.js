import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../assets'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

const UserOrderHistory = () => {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>ORDER HISTORY</Text>
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
          component={OngoingTab}
          options={{
            tabBarLabel: 'Ongoing',
            tabBarIcon: ({ focused }) => (
              focused
                ? (
                  <Image source={require('../../assets/images/icon_ongoing_active.png')} style={styles.ongoingIcon}/>
                )
                : (
                  <Image source={require('../../assets/images/icon_ongoing.png')} style={styles.ongoingIcon}/>
                )
            )
          }}
        />
        <Tab.Screen
          name='CompletedTab'
          component={CompletedTab}
          options={{
            tabBarLabel: 'Completed',
            tabBarIcon: ({ focused }) => (
              focused
                ? (
                  <Image source={require('../../assets/images/icon_completed_active.png')} style={styles.completedCancelledIcon}/>
                )
                : (
                  <Image source={require('../../assets/images/icon_completed.png')} style={styles.completedCancelledIcon}/>
                )
            )
          }}
        />
        <Tab.Screen
          name='CancelledTab'
          component={CancelledTab}
          options={{
            tabBarLabel: 'Cancelled',
            tabBarIcon: ({ focused }) => (
              focused
                ? (
                  <Image source={require('../../assets/images/icon_cancelled_active.png')} style={styles.completedCancelledIcon}/>
                )
                : (
                  <Image source={require('../../assets/images/icon_cancelled.png')} style={styles.completedCancelledIcon}/>
                )
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

const OngoingTab = () => {
  return (
    <View>
      <Text>OngoingTab</Text>
    </View>
  )
}

const CompletedTab = () => {
  return (
    <View>
      <Text>CompletedTab</Text>
    </View>
  )
}

const CancelledTab = () => {
  return (
    <View>
      <Text>CancelledTab</Text>
    </View>
  )
}

export default UserOrderHistory

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    alignSelf: 'center',
    marginVertical: 18
  },
  pageTitle: {
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
