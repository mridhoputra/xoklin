import axios from 'axios'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Gap from '../../components/gap'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import Button from '../../components/button'
import { useDispatch } from 'react-redux'
import { XOKLIN_ENDPOINT } from '@env'

const CreateUser = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const dataRole = ['ROLE_USER', 'ROLE_ADMIN']

  const [role, setRole] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [hidden, setHidden] = useState(true)
  const [confirmHidden, setConfirmHidden] = useState(true)

  const toggleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelectedDropdown = (value) => {
    setRole(value)
    toggleDropdownOpen()
  }

  const onSubmit = async () => {
    if (username !== '' && password !== '' && confirmPassword !== '' && fullname !== '' && email !== '' && phoneNumber !== '' && role !== '') {
      if (password === confirmPassword) {
        const body = {
          fullname,
          email,
          username,
          password,
          confPassword: confirmPassword,
          phone: phoneNumber,
          role
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
            alert(response.data.message)
            setFullname('')
            setEmail('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setPhoneNumber('')
            setRole('')
          }
          await dispatch({ type: 'SET_LOADING', value: false })
        } catch (e) {
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
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>CREATE USER</Text>
        <Gap width={10} />
      </View>
      <View style={styles.content}>
        <Text style={styles.titleContent}>You can create user through this form below:</Text>
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
        <Gap height={20} />
        <TouchableOpacity activeOpacity={0.7} style={styles.dropdown} onPress={toggleDropdownOpen}>
          <Text>{role === '' ? 'Role' : role}</Text>
          {isDropdownOpen
            ? (
              <Image source={require('../../assets/images/icon_chevron_top.png')} style={styles.iconDropdown}/>
            )
            : (
              <Image source={require('../../assets/images/icon_chevron_bottom.png')} style={styles.iconDropdown}/>
            )}
        </TouchableOpacity>
        {isDropdownOpen && (
          <View style={styles.containerItemDropdown}>
            {dataRole.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.itemDropdown} onPress={() => handleSelectedDropdown(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </View>
      <View style={styles.spacer} />
      <View style={styles.containerBtn}>
        <Button label='CREATE USER' onPress={onSubmit}/>
      </View>
    </ScrollView>
  )
}

export default CreateUser

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.border,
    borderBottomWidth: 1
  },
  btnBack: {
    width: 10,
    height: 18
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.primary
  },
  content: {
    padding: 16
  },
  titleContent: {
    color: '#9FA5C0',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginBottom: 16
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
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D0DBEA',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconDropdown: {
    width: 24,
    height: 24
  },
  containerItemDropdown: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: '#D0DBEA'
  },
  itemDropdown: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  spacer: {
    flex: 1
  },
  containerBtn: {
    marginVertical: 16,
    marginHorizontal: 16
  }
})
