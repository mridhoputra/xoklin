import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/button'
import Gap from '../../components/gap'
import formatRupiah from '../../utils/formatRupiah'
import { XOKLIN_URL } from '@env'

const Cart = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { cartData } = useSelector(state => state.CartReducer)

  const handleAddCount = (order, index, data) => {
    if (order.find(element => element.idItem === data.idItem)) {
      const incrementItem = order.map(element => {
        if (element.idItem === data.idItem) {
          return { ...element, count: element.count + 1, total: element.total + data.price }
        } else {
          return element
        }
      })
      modifyCart(index, incrementItem)
    }
  }

  const handleSubstractCount = (order, index, data) => {
    if (order.find(element => element.idItem === data.idItem)) {
      const decrementItem = order.map(element => {
        if (element.idItem === data.idItem) {
          return { ...element, count: element.count - 1, total: element.total - data.price }
        } else {
          return element
        }
      })

      const filteredItem = decrementItem.filter(element => element.count > 0)

      modifyCart(index, filteredItem)
    }
  }

  const handleTextCount = (order, data) => {
    const filteredOrder = order.find(element => element.idItem === data.idItem)
    if (filteredOrder !== undefined) {
      return filteredOrder.count
    } else {
      return 0
    }
  }

  const modifyCart = async (index, modifiedOrder) => {
    const currentCartData = cartData
    let tempAmount = 0
    modifiedOrder.forEach(element => {
      tempAmount = tempAmount + element.total
    })

    currentCartData[index] = {
      ...currentCartData[index],
      order: modifiedOrder,
      subtotal: tempAmount
    }

    await dispatch({ type: 'SET_CART', cart: currentCartData })
  }

  const removeCart = (index) => {
    Alert.alert(
      'Alert',
      'Are you sure you want to delete?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'default',
          onPress: async () => {
            const currentCartData = cartData
            currentCartData.splice(index, 1)
            await dispatch({ type: 'SET_CART', cart: currentCartData })
          }
        }
      ],
      { cancelable: true }
    )
  }

  const navigateToCartDetail = (index) => {
    navigation.navigate({ name: 'UserCartDetail', params: { dataOrder: cartData[index] }, merge: true })
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>CART</Text>
        <Gap width={10} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {cartData.length > 0
          ? (
            cartData.map((cart, cartIndex) => {
              return (
                <View key={cartIndex}>
                  <View style={styles.card}>
                    <Text style={styles.labelCard}>Pickup Location:</Text>
                    <Text style={styles.textCard}>{cart.address}</Text>
                    <Gap height={4} />
                    <Text style={styles.labelCard}>Order Details:</Text>
                    {cart.order?.map((item, itemIndex) => {
                      return (
                        <View key={itemIndex} style={styles.cardItem}>
                          <Image source={{ uri: `${XOKLIN_URL}/${item.iconUrl}` }} style={styles.cardIcon}/>
                          <View style={styles.containerItemDetail}>
                            <Text style={styles.textItemName}>{item.item}</Text>
                            <Text style={styles.textItemPrice}>{formatRupiah(item.price)}/{item.unit}</Text>
                          </View>
                          <View style={styles.containerCounter}>
                            <TouchableOpacity activeOpacity={0.6} style={styles.btnCount} onPress={() => handleSubstractCount(cart.order, cartIndex, item)}>
                              <Text style={styles.textOperation}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.textCount}>{handleTextCount(cart.order, item)}</Text>
                            <TouchableOpacity activeOpacity={0.6} style={styles.btnCount} onPress={() => handleAddCount(cart.order, cartIndex, item)}>
                              <Text style={styles.textOperation}>+</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    })}
                    <View style={styles.containerSubtotal}>
                      <Text style={styles.labelSubtotal}>Total Amount:</Text>
                      <Text style={styles.textSubtotal}>{cart.subtotal}</Text>
                    </View>
                    <View style={styles.border}/>
                    <View style={styles.containerButton}>
                      <TouchableOpacity activeOpacity={0.6} style={styles.containerIconDelete} onPress={() => removeCart(cartIndex)}>
                        <Image source={require('../../assets/images/icon_delete.png')} style={styles.iconDelete}/>
                      </TouchableOpacity>
                      <Button
                        label='Checkout'
                        width={128}
                        fontSize={14}
                        paddingVertical={8}
                        paddingHorizontal={16}
                        onPress={() => navigateToCartDetail(cartIndex)}
                      />
                    </View>
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
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
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
  },
  card: {
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 5,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  labelCard: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12
  },
  textCard: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.black
  },
  cardItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardIcon: {
    width: 60,
    height: 60
  },
  containerItemDetail: {
    flex: 1,
    marginLeft: 8
  },
  textItemName: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.black
  },
  textItemPrice: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: Colors.primary
  },
  containerCounter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnCount: {
    backgroundColor: Colors.primary,
    elevation: 1,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  textOperation: {
    color: Colors.white,
    fontFamily: 'Nunito-Regular',
    includeFontPadding: false
  },
  textCount: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.black,
    marginHorizontal: 8
  },
  containerSubtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  labelSubtotal: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.textGray
  },
  textSubtotal: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: Colors.primary
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerIconDelete: {
    backgroundColor: Colors.redLight,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  iconDelete: {
    width: 24,
    height: 24
  }
})
