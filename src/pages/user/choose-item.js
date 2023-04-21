import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Colors } from '../../assets'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import formatRupiah from '../../utils/formatRupiah'

const ChooseItem = (props) => {
  const { coordinate } = props.route.params ?? {}

  const [order, setOrder] = useState([])

  const dataItem = [
    {
      idItem: '278c79a0-d28e-11ed-bf97-838bc70500ea',
      item: 'Baju Kaos',
      price: '12000',
      unit: 'pcs',
      icon: '5be2c68410c1575caf3c25ee874b42a21680574350903.png',
      iconUrl: '/images/icon/5be2c68410c1575caf3c25ee874b42a21680574350903.png',
      is_active: true
    },
    {
      idItem: '3e4f1470-d8df-11ed-ae8a-5f34527b5ad3',
      item: 'kaos',
      price: '12000',
      unit: 'kg',
      icon: '5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      iconUrl: '/images/item/5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      is_active: true
    },
    {
      idItem: '3e4f1470-d8df-11ed-ae8a-5f34527b5ad3',
      item: 'kaos',
      price: '12000',
      unit: 'kg',
      icon: '5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      iconUrl: '/images/item/5be2c68410c1575caf3c25ee874b42a21681268885300.png',
      is_active: true
    }
  ]

  return (
    <View style={styles.page}>
      <Image source={require('../../assets/images/bg_user_order.png')} style={styles.imgHeader}/>
      <View style={styles.containerItem}>
        <ScrollView>
          <Text>Choose Item to Laundry</Text>
          {dataItem.map((item, index) => {
            return (
              <View key={index} style={styles.card}>
                <Image source={require('../../assets/images/icon_jacket.png')} />
                <Text>{item.item}</Text>
                <Text>{formatRupiah(item.price)}/{item.unit}</Text>
                <TouchableOpacity>
                  <Text>-</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View>
        <Text>Total</Text>
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
  containerItem: {
    flex: 1,
    padding: 12
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 6
  }
})
