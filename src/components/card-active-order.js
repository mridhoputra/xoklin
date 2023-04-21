import PropTypes from 'prop-types'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../assets'
import Gap from './gap'

const CardActiveOrder = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
      <Image source={props.image} style={styles.image}/>
      <View style={styles.containerDetail}>
        <Text style={styles.id}>{props.id}</Text>
        <Gap height={2}/>
        <Text style={styles.orders}>{props.orders}</Text>
        <Gap height={2}/>
        <Text style={styles.status}>{props.status}</Text>
      </View>
    </TouchableOpacity>
  )
}

CardActiveOrder.propTypes = {
  image: PropTypes.number,
  id: PropTypes.string,
  orders: PropTypes.string,
  status: PropTypes.string
}

export default CardActiveOrder

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 4,
    elevation: 4,
    marginVertical: 8,
    padding: 16,
    alignItems: 'center'
  },
  image: {
    height: 48,
    width: 48
  },
  containerDetail: {
    marginLeft: 12
  },
  id: {
    fontFamily: 'Nunito-Regular',
    fontSize: 8,
    color: Colors.black
  },
  orders: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.black
  },
  status: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: Colors.primary
  }
})
