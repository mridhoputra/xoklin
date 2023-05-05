import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import Gap from '../../components/gap'
import Button from '../../components/button'
import axios from 'axios'
import { XOKLIN_ENDPOINT } from '@env'

const UserEditProfile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  const [fullname, setFullname] = useState(userData.fullname)
  const [email, setEmail] = useState(userData.email)
  const [phoneNumber, setPhoneNumber] = useState(userData.phone)

  const onSubmit = () => {
    if (fullname !== '' && email !== '' && phoneNumber !== '') {
      Alert.alert(
        'Alert',
        'Are you sure you want to update your profile?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'default',
            onPress: async () => {
              const body = {
                username: userData.username,
                fullname,
                email,
                phone: phoneNumber
              }
              const header = {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userData.token}`
                }
              }
              try {
                await dispatch({ type: 'SET_LOADING', value: true })

                const response = await axios.patch(`${XOKLIN_ENDPOINT}/users/${userData.idUser}`, body, header)

                if (response.status === 200) {
                  await dispatch({ type: 'SET_LOADING', value: false })

                  const updatedUserData = {
                    ...userData,
                    username: userData.username,
                    fullname,
                    email,
                    phone: phoneNumber
                  }
                  await dispatch({ type: 'EDIT_PROFILE', user: updatedUserData })

                  ToastAndroid.show(response.data.message, ToastAndroid.LONG)
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
            }
          }
        ],
        { cancelable: true }
      )
    } else {
      ToastAndroid.show('Please fill the form above', ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.page}>
      <ImageBackground source={require('../../assets/images/bg_profile.png')} style={styles.bgHeader}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
          </TouchableOpacity>
          <Text style={styles.title}>EDIT PROFILE</Text>
          <Gap width={10} />
        </View>
        <View style={styles.spacer}/>
        <View style={styles.containerAvatar}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.avatar}/>
          <Text style={styles.labelUsername}>Username</Text>
          <Text style={styles.textUsername}>{userData.username}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
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
          value={phoneNumber}
          style={styles.textInput}
          keyboardType='phone-pad'
          placeholder='Handphone Number'
          onChangeText={(value) => setPhoneNumber(value)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.containerButton}>
        <Button label='UPDATE PROFILE' fontSize={14} paddingVertical={12} onPress={onSubmit}/>
      </View>
    </View>
  )
}

export default UserEditProfile

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bgHeader: {
    resizeMode: 'cover',
    height: 225
  },
  btnBack: {
    width: 10,
    height: 18
  },
  btnLogout: {
    width: 24,
    height: 24
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.primary
  },
  spacer: {
    flex: 1
  },
  containerAvatar: {
    bottom: -32
  },
  avatar: {
    alignSelf: 'center',
    width: 92,
    height: 92
  },
  labelUsername: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    fontSize: 10,
    color: Colors.textGray
  },
  textUsername: {
    fontFamily: 'Nunito-SemiBold',
    textAlign: 'center',
    fontSize: 12,
    color: Colors.black
  },
  content: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16
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
  border: {
    width: '100%',
    height: 1,
    backgroundColor: '#0000000D',
    marginVertical: 12
  },
  containerButton: {
    marginHorizontal: 16,
    marginBottom: 16
  }
})
