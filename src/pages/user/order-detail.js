import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserOrderDetail = (props) => {
  const { orderDetail } = props.route.params

  return (
    <View>
      <Text>UserOrderDetail</Text>
    </View>
  )
}

export default UserOrderDetail

UserOrderDetail.propTypes = {
  route: PropTypes.object
}

const styles = StyleSheet.create({})
