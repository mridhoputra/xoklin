import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Gap from '../../components/gap'
import Button from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { XOKLIN_ENDPOINT } from '@env'
import { useDispatch } from 'react-redux'

const Register = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [hidden, setHidden] = useState(true)
  const [confirmHidden, setConfirmHidden] = useState(true)

  const onSubmit = async () => {
    if (username !== '' && password !== '' && confirmPassword !== '' && fullname !== '' && email !== '' && phoneNumber !== '') {
      if (password === confirmPassword) {
        const body = {
          fullname,
          email,
          username,
          password,
          confPassword: confirmPassword,
          phone: phoneNumber
        }
        const header = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
        try {
          await dispatch({ type: 'SET_LOADING', value: true })

          const response = await axios.post(`${XOKLIN_ENDPOINT}/auth/register`, body, header)

          if (response.status === 200) {
            const header = {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
            console.log(response.data)
            try {
              const responseProfile = await axios.get(`${XOKLIN_ENDPOINT}/auth/me`, header)

              if (responseProfile.status === 200) {
                console.log(responseProfile.data)
                navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] })
              }
            } catch (e) {
              if (e.response.data?.message) {
                ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
              } else {
                ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
              }
            }
          }
          await dispatch({ type: 'SET_LOADING', value: false })
        } catch (e) {
          console.log(e.response.data)
          await dispatch({ type: 'SET_LOADING', value: false })
          if (e.response.data?.message) {
            ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
          } else {
            ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
          }
        }
      } else {
        ToastAndroid.show('Password not match', ToastAndroid.LONG)
      }
    } else {
      ToastAndroid.show('Please fill the username and password form above', ToastAndroid.LONG)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/images/icon_back.png')} style={styles.iconBack}/>
      </TouchableOpacity>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
      <Text style={styles.title}>Please enter your username and password</Text>
      <TextInput
        value={fullname}
        style={styles.textInput}
        placeholder='Fullname'
        onChangeText={(value) => setFullname(value)}
      />
      <Gap height={20}/>
      <TextInput
        value={email}
        style={styles.textInput}
        placeholder='Email'
        autoCapitalize='none'
        keyboardType='email-address'
        onChangeText={(value) => setEmail(value)}
      />
      <Gap height={20}/>
      <TextInput
        value={username}
        style={styles.textInput}
        autoCapitalize='none'
        placeholder='Username'
        onChangeText={(value) => setUsername(value)}
      />
      <Gap height={20}/>
      <View style={styles.containerPassword}>
        <TextInput
          value={password}
          style={styles.textInputPassword}
          autoCapitalize='none'
          placeholder='Password'
          secureTextEntry={hidden}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={() => setHidden(!hidden)}>
          <Image source={hidden ? require('../../assets/images/icon_eye_disabled.png') : require('../../assets/images/icon_eye_enabled.png')} style={styles.iconEye}/>
        </TouchableOpacity>
      </View>
      <Gap height={20} />
      <View style={styles.containerPassword}>
        <TextInput
          value={confirmPassword}
          style={styles.textInputPassword}
          autoCapitalize='none'
          placeholder='Confirm Password'
          secureTextEntry={confirmHidden}
          onChangeText={(value) => setConfirmPassword(value)}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={() => setConfirmHidden(!confirmHidden)}>
          <Image source={confirmHidden ? require('../../assets/images/icon_eye_disabled.png') : require('../../assets/images/icon_eye_enabled.png')} style={styles.iconEye}/>
        </TouchableOpacity>
      </View>
      <Gap height={20}/>
      <TextInput
        value={phoneNumber}
        style={styles.textInput}
        keyboardType='phone-pad'
        placeholder='Handphone Number'
        onChangeText={(value) => setPhoneNumber(value)}
      />
      <Gap height={40}/>
      <Button label='Register' onPress={onSubmit}/>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  page: {
    padding: 16
  },
  iconBack: {
    width: 10,
    height: 18
  },
  logo: {
    height: 132,
    width: 132,
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
  }
})
