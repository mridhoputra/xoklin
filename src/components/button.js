import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../assets'

const Button = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={[styles.container, { width: props.width ? props.width : '100%' }]}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default Button

Button.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8
  },
  label: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.white
  }
})
