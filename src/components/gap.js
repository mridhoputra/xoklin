import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

const Gap = (props) => {
  return (
    <View style={{ width: props.width, height: props.height }} />
  )
}

Gap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default Gap
