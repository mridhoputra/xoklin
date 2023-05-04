import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'

import Gap from '../../components/gap'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import { useSelector } from 'react-redux'
import { XOKLIN_ENDPOINT } from '@env'

import axios from 'axios'

const UserManagement = () => {
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  const [isLoading, setIsLoading] = useState(false)
  const [dataUsers, setDataUsers] = useState([])

  const fetchAllUsers = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/users`, header)
      if (response.status === 200) {
        setDataUsers(response.data.data)
        console.log(response.data.data)
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

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>USER MANAGEMENT</Text>
        <Gap width={10} />
      </View>
      <View>
        <Text>List User</Text>
        <TextInput placeholder='Search User' />
      </View>
    </View>
  )
}

export default UserManagement

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnBack: {
    width: 10,
    height: 18
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.primary
  }
})
