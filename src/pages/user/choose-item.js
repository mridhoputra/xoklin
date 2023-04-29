import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Colors } from '../../assets'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import formatRupiah from '../../utils/formatRupiah'
import Button from '../../components/button'
import { useNavigation } from '@react-navigation/native'

const ChooseItem = (props) => {
  const navigation = useNavigation()

  const { coordinate } = props.route.params ?? {}

  const [order, setOrder] = useState([])
  const [amount, setAmount] = useState(0)

  const dataItems = [
    {
      idItem: '278c79a0-d28e-11ed-bf97-838bc70500ea',
      item: 'Baju Kaos',
      price: 12000,
      unit: 'pcs',
      icon: '5be2c68410c1575caf3c25ee874b42a21680574350903.png',
      iconUrl: '/images/icon/5be2c68410c1575caf3c25ee874b42a21680574350903.png',
      is_active: true
    },
    {
      idItem: '3e4f1470-d8df-11ed-ae8a-5f34527b5ad3',
      item: 'kaos',
      price: 12000,
      unit: 'pcs',
      icon: '5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      iconUrl: '/images/item/5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      is_active: true
    },
    {
      idItem: '3e4f1470-d8df-11ed-ae8a-5f34527b5ad4',
      item: 'Cuci Lipat',
      price: 6000,
      unit: 'kg',
      icon: '5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      iconUrl: '/images/item/5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      is_active: true
    }
  ]

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

  useEffect(() => {
    let tempAmount = 0
    order.forEach(element => {
      tempAmount = tempAmount + element.total
    })
    setAmount(tempAmount)
  }, [order])

  const onComplete = () => {
    const dataOrder = {
      address: coordinate.address,
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
      order,
      subtotal: amount,
      userId: 'userId here'
    }
    navigation.navigate({ name: 'UserCartDetail', params: { dataOrder }, merge: true })
  }

  return (
    <View style={styles.page}>
      <Image source={require('../../assets/images/bg_user_order.png')} style={styles.imgHeader}/>
      <View style={styles.containerItem}>
        <ScrollView>
          <Text style={styles.title}>Choose Item to Laundry</Text>
          {dataItems.map((data, index) => {
            return (
              <View key={index} style={styles.card}>
                <Image source={require('../../assets/images/icon_jacket.png')} style={styles.cardIcon}/>
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
          })}
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
    color: Colors.black
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
  }
})
