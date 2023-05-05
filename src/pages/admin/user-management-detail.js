import PropTypes from 'prop-types'
import axios from 'axios'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Gap from '../../components/gap'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import Button from '../../components/button'
import { useDispatch, useSelector } from 'react-redux'
import { XOKLIN_ENDPOINT } from '@env'

const UserManagementDetail = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { dataUser } = props.route.params
  const { userData } = useSelector(state => state.UserReducer)

  const dataRole = ['ROLE_USER', 'ROLE_ADMIN']

  const [role, setRole] = useState(dataUser.role)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [username, setUsername] = useState(dataUser.username)
  const [fullname, setFullname] = useState(dataUser.fullname)
  const [email, setEmail] = useState(dataUser.email)
  const [phoneNumber, setPhoneNumber] = useState(dataUser.phone)

  const toggleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelectedDropdown = (value) => {
    setRole(value)
    toggleDropdownOpen()
  }

  const onDelete = () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to delete this user?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'default',
          onPress: async () => {
            const header = {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userData.token}`
              }
            }

            try {
              await dispatch({ type: 'SET_LOADING', value: true })

              const response = await axios.delete(`${XOKLIN_ENDPOINT}/users/${dataUser.idUser}`, header)

              if (response.status === 200) {
                Alert.alert(
                  'Alert',
                  response.data.message,
                  [
                    {
                      text: 'OK',
                      style: 'default',
                      onPress: async () => {
                        navigation.goBack()
                      }
                    }
                  ]
                )
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
  }

  const onSubmit = async () => {
    if (username !== '' && fullname !== '' && email !== '' && phoneNumber !== '' && role !== '') {
      const body = {
        fullname,
        email,
        username,
        phone: phoneNumber,
        role
      }
      const header = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      }

      Alert.alert(
        'Alert',
        'Are you sure you want to update this user?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'default',
            onPress: async () => {
              try {
                await dispatch({ type: 'SET_LOADING', value: true })

                const response = await axios.patch(`${XOKLIN_ENDPOINT}/users/${dataUser.idUser}`, body, header)

                if (response.status === 200) {
                  alert(response.data.message)
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
      ToastAndroid.show('Password not match', ToastAndroid.LONG)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>UPDATE USER</Text>
        <TouchableOpacity activeOpacity={0.6} style={styles.containerIconDelete} onPress={onDelete}>
          <Image source={require('../../assets/images/icon_delete.png')} style={styles.iconDelete}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.titleContent}>You can update user through this form below:</Text>
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
        <Button label='UPDATE USER' onPress={onSubmit}/>
      </View>
    </ScrollView>
  )
}

UserManagementDetail.propTypes = {
  route: PropTypes.object
}

export default UserManagementDetail

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
    width: 36,
    height: 18,
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.primary
  },
  containerIconDelete: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  iconDelete: {
    width: 24,
    height: 24
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
