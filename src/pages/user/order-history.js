import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../assets'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Button from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import Gap from '../../components/gap'

const Tab = createMaterialTopTabNavigator()

const UserOrderHistory = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>CART</Text>
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
  const navigation = useNavigation()
  return (
    <View style={styles.emptyPage}>
      <Text style={styles.labelEmptyPage}>There is no order</Text>
      <Button label='ORDER NOW' width={160} onPress={() => navigation.navigate('UserChooseLocation')}/>
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  },
  emptyPage: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelEmptyPage: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.textGray,
    marginBottom: 20
  }
})
