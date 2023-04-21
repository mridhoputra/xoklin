import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Gap from '../../components/gap'
import Button from '../../components/button'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hidden, setHidden] = useState(true)

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
        onChangeText={(value) => setUsername(value)}
      />
      <Gap height={20}/>
      <View style={styles.containerPassword}>
        <TextInput
          value={password}
          style={styles.textInputPassword}
          placeholder='Password'
          secureTextEntry={hidden}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={() => setHidden(!hidden)}>
          <Image source={hidden ? require('../../assets/images/icon_eye_disabled.png') : require('../../assets/images/icon_eye_enabled.png')} style={styles.iconEye}/>
        </TouchableOpacity>
      </View>
      <View style={styles.spacer}/>
      <Button label='LOGIN' onPress={() => navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] })}/>
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
