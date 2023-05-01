import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Colors } from '../../assets'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import formatRupiah from '../../utils/formatRupiah'
import Button from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { XOKLIN_ENDPOINT, XOKLIN_URL } from '@env'

const ChooseItem = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { coordinate } = props.route.params ?? {}
  const { userData } = useSelector(state => state.UserReducer)
  const { cartData } = useSelector(state => state.CartReducer)

  const [order, setOrder] = useState([])
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [dataItems, setDataItems] = useState([])

  const fetchAllItems = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/items`, header)
      if (response.status === 200) {
        const result = response.data.data.map((item) => {
          return { ...item, price: parseInt(item.price) }
        })
        setDataItems(result)
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

  const handleAddCount = (data) => {
    if (order.find(element => element.idItem === data.idItem)) {
      const incrementItem = order.map(element => {
        if (element.idItem === data.idItem) {
          return { ...element, count: element.count + 1, total: element.total + data.price }
        } else {
          return element
        }
      })
      setOrder(incrementItem)
    } else {
      const newItem = {
        idItem: data.idItem,
        item: data.item,
        count: 1,
        total: data.price
      }
      setOrder(state => [...state, newItem])
    }
  }

  const handleSubstractCount = (data) => {
    if (order.find(element => element.idItem === data.idItem)) {
      const decrementItem = order.map(element => {
        if (element.idItem === data.idItem) {
          return { ...element, count: element.count - 1, total: element.total - data.price }
        } else {
          return element
        }
      })

      const filteredItem = decrementItem.filter(element => element.count > 0)

      setOrder(filteredItem)
    }
  }

  const handleTextCount = (data) => {
    const filteredOrder = order.find(element => element.idItem === data.idItem)
    if (filteredOrder !== undefined) {
      return filteredOrder.count
    } else {
      return 0
    }
  }

  const handleAddCart = async (dataOrder) => {
    let tempCart = cartData
    tempCart = [...tempCart, dataOrder]
    await dispatch({ type: 'SET_CART', cart: tempCart })
  }

  const onComplete = () => {
    const dataOrder = {
      address: coordinate.address,
      longtitude: coordinate.longitude,
      latitude: coordinate.latitude,
      order,
      subtotal: amount,
      userId: userData.idUser
    }
    handleAddCart(dataOrder)
    navigation.navigate({ name: 'UserCartDetail', params: { dataOrder }, merge: true })
  }

  useEffect(() => {
    fetchAllItems()
  }, [])

  useEffect(() => {
    let tempAmount = 0
    order.forEach(element => {
      tempAmount = tempAmount + element.total
    })
    setAmount(tempAmount)
  }, [order])

  return (
    <View style={styles.page}>
      <Image source={require('../../assets/images/bg_user_order.png')} style={styles.imgHeader}/>
      <View style={styles.containerItem}>
        <ScrollView>
          <Text style={styles.title}>Choose Item to Laundry</Text>
          {isLoading
            ? (
              <View style={styles.containerLoading}>
                <ActivityIndicator size={24} color={Colors.primary}/>
                <Text style={styles.textLoading}>Loading...</Text>
              </View>
            )
            : (
              dataItems.map((data, index) => {
                return (
                  <View key={index} style={styles.card}>
                    <Image source={{ uri: `${XOKLIN_URL}/${data.iconUrl}` }} style={styles.cardIcon}/>
                    <View style={styles.containerItemDetail}>
                      <Text style={styles.textItemName}>{data.item}</Text>
                      <Text style={styles.textItemPrice}>{formatRupiah(data.price)}/{data.unit}</Text>
                    </View>
                    <View style={styles.containerCounter}>
                      <TouchableOpacity activeOpacity={0.6} style={styles.btnCount} onPress={() => handleSubstractCount(data)}>
                        <Text style={styles.textOperation}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.textCount}>{handleTextCount(data)}</Text>
                      <TouchableOpacity activeOpacity={0.6} style={styles.btnCount} onPress={() => handleAddCount(data)}>
                        <Text style={styles.textOperation}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            )}
        </ScrollView>
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.labelTotal}>Total: <Text style={styles.textTotal}>{formatRupiah(amount)}</Text></Text>
        <View>
          <Button label='Add to Cart' width={140} onPress={onComplete}/>
        </View>
      </View>
    </View>
  )
}

ChooseItem.propTypes = {
  route: PropTypes.object
}

export default ChooseItem

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white
  },
  imgHeader: {
    width: '100%',
    height: 144
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 8
  },
  containerItem: {
    flex: 1,
    padding: 12
  },
  card: {
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
  containerTotal: {
    elevation: 10,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  labelTotal: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: Colors.black
  },
  textTotal: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: Colors.black
  },
  containerLoading: {
    marginTop: 24
  },
  textLoading: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    textAlign: 'center',
    color: Colors.textGray,
    marginTop: 2
  }
})
