import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const ItemManagement = () => {
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  return (
    <View>
      <Text>ItemManagement</Text>
    </View>
  )
}

export default ItemManagement

const styles = StyleSheet.create({})
