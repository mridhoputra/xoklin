import { Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Gap from '../../components/gap'
import Button from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { XOKLIN_ENDPOINT } from '@env'
import axios from 'axios'

const Login = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hidden, setHidden] = useState(true)

  const onSubmit = async () => {
    if (username !== '' && password !== '') {
      try {
        await dispatch({ type: 'SET_LOADING', value: true })
        const body = {
          username,
          password
        }
        const header = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const response = await axios.post(`${XOKLIN_ENDPOINT}/auth/login`, body, header)
        if (response.status === 200) {
          try {
            const header = {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${response.data.token}`
              }
            }
            const responseProfile = await axios.get(`${XOKLIN_ENDPOINT}/auth/me`, header)
            if (responseProfile.status === 200) {
              const dataProfile = responseProfile.data.data
              const user = {
                idUser: dataProfile.idUser,
                username: dataProfile.username,
                email: dataProfile.email,
                fullname: dataProfile.fullname,
                phone: dataProfile.phone,
                role: dataProfile.role,
                token: response.data.token
              }
              await dispatch({ type: 'LOGIN', user })
              if (user.role === 'ROLE_USER') {
                navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] })
              } else if (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_SUPERADMIN') {
                navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] })
                ToastAndroid.show(user.role, ToastAndroid.LONG)
              } else {
                ToastAndroid.show('ROLE NOT HANDLED', ToastAndroid.LONG)
              }
            }
          } catch (e) {
            if (e.response.data?.message) {
              ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
            } else {
              ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
            }
          }
        }
      } catch (e) {
        if (e.response.data?.message) {
          ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        } else {
          ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
        }
      }
      await dispatch({ type: 'SET_LOADING', value: false })
    } else {
      ToastAndroid.show('Please fill the username and password form above', ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.page}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/images/icon_back.png')} style={styles.iconBack}/>
      </TouchableOpacity>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
      <Text style={styles.title}>Please enter your username and password</Text>
      <TextInput
        value={username}
        style={styles.textInput}
        placeholder='Username'
        autoCapitalize='none'
        onChangeText={(value) => setUsername(value)}
      />
      <Gap height={20}/>
      <View style={styles.containerPassword}>
        <TextInput
          value={password}
          style={styles.textInputPassword}
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry={hidden}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={() => setHidden(!hidden)}>
          <Image source={hidden ? require('../../assets/images/icon_eye_disabled.png') : require('../../assets/images/icon_eye_enabled.png')} style={styles.iconEye}/>
        </TouchableOpacity>
      </View>
      <View style={styles.spacer}/>
      <Button label='LOGIN' onPress={onSubmit}/>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16
  },
  iconBack: {
    width: 10,
    height: 18
  },
  logo: {
    height: 223,
    width: 223,
    alignSelf: 'center',
    marginBottom: 40
  },
  title: {
    color: '#9FA5C0',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D0DBEA',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  containerPassword: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D0DBEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8
  },
  textInputPassword: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    flex: 1
  },
  iconEye: {
    width: 24,
    height: 24
  },
  spacer: {
    flex: 1
  }
})
