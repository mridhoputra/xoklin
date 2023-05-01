import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Button from '../../components/button'

const Cart = () => {
  const navigation = useNavigation()

  const { cartData } = useSelector(state => state.CartReducer)

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>CART</Text>
        <View />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {cartData.length > 0
          ? (
            cartData.map((item, index) => {
              return (
                <View key={index}>
                  <View>
                    <Text>Pickup Location:</Text>
                    <Text>{item.address}</Text>
                    <Text>Order Details:</Text>
                  </View>
                </View>
              )
            })
          )
          : (
            <View style={styles.containerCartEmpty}>
              <Text style={styles.textCartEmpty}>Your cart is still empty</Text>
              <Button width={144} label='ORDER NOW' onPress={() => navigation.navigate('UserChooseLocation')}/>
            </View>
          )}
      </ScrollView>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white
  },
  scrollView: {
    flexGrow: 1,
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
  containerCartEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textCartEmpty: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textGray,
    marginBottom: 8
  }
})
