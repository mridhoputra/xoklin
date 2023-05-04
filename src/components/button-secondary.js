import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../assets'

const ButtonSecondary = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={[styles.container,
        {
          width: props.width ? props.width : '100%',
          paddingVertical: props.paddingVertical ? props.paddingVertical : 16,
          paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : 0
        }
      ]}>
      <Text style={[styles.label, { fontSize: props.fontSize ? props.fontSize : 16 }]}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default ButtonSecondary

ButtonSecondary.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  fontSize: PropTypes.number,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 2
  },
  label: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.primary
  }
})
