
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../assets'

const Menu = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={styles.container}>
      <Image source={props.image} style={styles.image}/>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default Menu

Menu.propTypes = {
  label: PropTypes.string,
  image: PropTypes.number,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 2
  },
  image: {
    width: 36,
    height: 36
  },
  label: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.black
  }
})
