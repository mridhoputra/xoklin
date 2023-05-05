import axios from 'axios'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ToastAndroid, Alert, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import Gap from '../../components/gap'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import Button from '../../components/button'
import { useDispatch, useSelector } from 'react-redux'
import { XOKLIN_ENDPOINT } from '@env'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const AddItem = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  const dataUnit = ['pcs', 'kg']

  const [unit, setUnit] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [fileName, setFilename] = useState('')
  const [file, setFile] = useState('')

  const toggleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelectedDropdown = (value) => {
    setUnit(value)
    toggleDropdownOpen()
  }

  const launchCameraOrLibrary = async () => {
    Alert.alert(
      'Upload Image for this item',
      'You can upload using camera or gallery',
      [
        {
          text: 'Camera',
          style: 'default',
          onPress: async () => {
            try {
              const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
              if (isGranted) {
                launchCamera({
                  saveToPhotos: true
                }, async (response) => {
                  if (response.didCancel || response.errorCode) {
                    if (response.errorMessage) {
                      ToastAndroid.show(response.errorMessage, ToastAndroid.LONG)
                    } else {
                      ToastAndroid.show('Cancelled')
                    }
                  } else {
                    const res = response.assets[0]
                    setFile(res.uri)
                    setFilename(res.fileName)
                  }
                })
              } else {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  launchCamera({
                    saveToPhotos: true
                  }, async (response) => {
                    if (response.didCancel || response.errorCode) {
                      if (response.errorMessage) {
                        ToastAndroid.show(response.errorMessage, ToastAndroid.LONG)
                      } else {
                        ToastAndroid.show('Cancelled')
                      }
                    } else {
                      const res = response.assets[0]
                      setFile(res.uri)
                      setFilename(res.fileName)
                    }
                  })
                } else {
                  ToastAndroid.show('Access Camera denied', ToastAndroid.LONG)
                }
              }
            } catch (e) {
              ToastAndroid.show(`${e}`, ToastAndroid.LONG)
            }
          }
        },
        {
          text: 'gallery',
          style: 'default',
          onPress: async () => {
            try {
              launchImageLibrary({}, async (response) => {
                if (response.didCancel || response.errorCode) {
                  if (response.errorMessage) {
                    ToastAndroid.show(response.errorMessage, ToastAndroid.LONG)
                  } else {
                    ToastAndroid.show('Cancelled', ToastAndroid.LONG)
                  }
                } else {
                  const res = response.assets[0]
                  setFile(res.uri)
                  setFilename(res.fileName)
                }
              })
            } catch (e) {
              ToastAndroid.show(`${e}`, ToastAndroid.LONG)
            }
          }
        }
      ],
      { cancelable: true }
    )
  }

  const onSubmit = async () => {
    if (item !== '' && price !== '' && unit !== '' && file !== '') {
      const formData = new FormData()
      formData.append('item', item)
      formData.append('price', price)
      formData.append('unit', unit)
      formData.append('file', { uri: file, type: 'image/jpeg', name: fileName })

      const header = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userData.token}`
        }
      }

      try {
        await dispatch({ type: 'SET_LOADING', value: true })

        const response = await axios.post(`${XOKLIN_ENDPOINT}/items`, formData, header)

        if (response.status === 200) {
          alert(response.data.message)
          setItem('')
          setPrice('')
          setUnit('')
          setFile('')
          setFilename('')
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
      ToastAndroid.show('Please fill the form above', ToastAndroid.LONG)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>ADD NEW ITEM</Text>
        <Gap width={10} />
      </View>
      <View style={styles.content}>
        <Text style={styles.titleContent}>You can add new item through this form below:</Text>
        <TextInput
          value={item}
          style={styles.textInput}
          placeholder='Item Name'
          onChangeText={(value) => setItem(value)}
        />
        <Gap height={20}/>
        <TextInput
          value={price}
          style={styles.textInput}
          autoCapitalize='none'
          keyboardType='number-pad'
          placeholder='Price'
          onChangeText={(value) => setPrice(value)}
        />
        <Gap height={20} />
        <TouchableOpacity activeOpacity={0.7} style={styles.dropdown} onPress={toggleDropdownOpen}>
          <Text>{unit === '' ? 'Unit' : unit}</Text>
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
            {dataUnit.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.itemDropdown} onPress={() => handleSelectedDropdown(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        )}
        <Gap height={20} />
        <View style={styles.containerUploadAndImage}>
          <View style={[styles.containerUpload, file !== '' && { alignItems: 'flex-start' }]}>
            <TouchableOpacity activeOpacity={0.7} style={styles.btnUpload} onPress={launchCameraOrLibrary}>
              <Text style={styles.textUpload}>Upload</Text>
            </TouchableOpacity>
            <Gap width={8} />
            <Text style={fileName === '' ? styles.labelFilename : styles.textFilename}>{fileName === '' ? 'Item Image' : fileName}</Text>
          </View>
          {file !== '' && (
            <View style={styles.containerImage}>
              <Text style={styles.labelImage}>Image: </Text>
              <Gap width={28} />
              <Image source={{ uri: file }} style={styles.imgUploaded}/>
            </View>
          )}
        </View>
      </View>
      <View style={styles.spacer} />
      <View style={styles.containerBtn}>
        <Button label='CREATE ITEM' onPress={onSubmit}/>
      </View>
    </ScrollView>
  )
}

export default AddItem

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
  containerUploadAndImage: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D0DBEA',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  containerUpload: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnUpload: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12
  },
  textUpload: {
    color: Colors.white
  },
  labelFilename: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textGray,
    flex: 1
  },
  textFilename: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.black,
    flex: 1
  },
  labelImage: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textGray
  },
  containerImage: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  imgUploaded: {
    width: 56,
    height: 56
  },
  spacer: {
    flex: 1
  },
  containerBtn: {
    marginVertical: 16,
    marginHorizontal: 16
  }
})
