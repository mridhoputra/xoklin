import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ToastAndroid, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { Colors } from '../../assets'
import Gap from '../../components/gap'
import { formatButtonStatus, formatStatus } from '../../utils/formatStatus'
import formatRupiah from '../../utils/formatRupiah'
import Button from '../../components/button'
import { XOKLIN_ENDPOINT } from '@env'

const AdminOrderDetail = (props) => {
  const { orderDetail } = props.route.params

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { userData } = useSelector(state => state.UserReducer)

  const deliveryFee = 5000
  const latitude = parseFloat(orderDetail.latitude)
  const longitude = parseFloat(orderDetail.longtitude)

  const [orderStatus, setOrderStatus] = useState(orderDetail.status)

  const navigateToSeeLocation = () => {
    const coordinate = {
      latitude,
      longitude,
      address: orderDetail.address
    }
    navigation.navigate({ name: 'AdminViewLocation', params: { coordinate }, merge: true })
  }

  const fetchAccOrder = () => {
    const body = {
      status: orderStatus + 1
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
      'Are you sure you want to confirm order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'default',
          onPress: async () => {
            try {
              await dispatch({ type: 'SET_LOADING', value: true })
              const response = await axios.patch(`${XOKLIN_ENDPOINT}/orders/${orderDetail.idOrder}`, body, header)
              if (response.status === 200) {
                setOrderStatus(orderStatus + 1)
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

  const fetchCancelOrder = () => {
    const body = {
      status: 0
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
      'Are you sure you want to confirm order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'default',
          onPress: async () => {
            try {
              await dispatch({ type: 'SET_LOADING', value: true })
              const response = await axios.patch(`${XOKLIN_ENDPOINT}/orders/${orderDetail.idOrder}`, body, header)
              if (response.status === 200) {
                setOrderStatus(0)
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

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>ORDER DETAILS</Text>
        <Gap width={10} />
      </View>
      <View style={styles.content}>
        <View style={styles.containerData}>
          <Text style={styles.labelData}>Status:</Text>
          <Text style={[styles.textStatus,
            orderStatus === 0
              ? { color: Colors.red }
              : orderStatus === 9
                ? { color: Colors.primary }
                : { color: Colors.yellow }
          ]}>{formatStatus(orderStatus)}</Text>
        </View>
        <View style={styles.containerData}>
          <Text style={styles.labelData}>Order ID:</Text>
          <Text style={styles.textData}>{orderDetail.idOrder}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.containerData}>
          <Text style={styles.labelData}>Name:</Text>
          <Text style={styles.textData}>{orderDetail.User.fullname}</Text>
        </View>
        <View style={styles.containerData}>
          <Text style={styles.labelData}>Phone:</Text>
          <Text style={styles.textData}>{orderDetail.User.phone}</Text>
        </View>
        <View style={styles.containerData}>
          <Text style={styles.labelData}>Address:</Text>
          <Text style={styles.textData}>{orderDetail.address}</Text>
        </View>
        <View style={styles.containerData}>
          <Text style={styles.labelData}>Location:</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={navigateToSeeLocation} style={styles.containerTextLink}>
            <Text style={styles.textLink}>See Location</Text>
          </TouchableOpacity>
        </View>
        <Gap height={4} />
        <View style={styles.border} />
        <View style={styles.containerOrderDetails}>
          <View style={styles.containerTop}>
            <Text style={styles.labelOrderDetail}>Order Details</Text>
            {orderDetail.order.map((item, index) => {
              return (
                <View key={index} style={styles.containerPrice}>
                  <Text style={styles.textPrice}>{item.item} x {item.count} {item.unit}</Text>
                  <Text style={styles.textPrice}>{formatRupiah(item.total)}</Text>
                </View>
              )
            })}
            <View style={styles.border} />
            <View style={styles.containerPrice}>
              <Text style={styles.labelPrice}>Subtotal:</Text>
              <Text style={styles.textPrice}>{formatRupiah(orderDetail.ammount - deliveryFee)}</Text>
            </View>
          </View>
          <View style={styles.containerBottom}>
            <View style={styles.containerPrice}>
              <Text style={styles.labelPrice}>Delivery Fee:</Text>
              <Text style={styles.textPrice}>{formatRupiah(deliveryFee)}</Text>
            </View>
            <View style={styles.containerPrice}>
              <Text style={styles.labelPrice}>Total Price:</Text>
              <Text style={styles.textTotalPrice}>{formatRupiah(orderDetail.ammount)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.spacer}/>
      {(orderStatus !== 0 && orderStatus !== 9) && (
        <View style={styles.containerButtonUpdate}>
          <Button
            label={formatButtonStatus(orderStatus)}
            fontSize={14}
            paddingVertical={12}
            onPress={fetchAccOrder}
          />
        </View>
      )}
      {orderStatus === 1 && (
        <View style={styles.containerButtonUpdate}>
          <TouchableOpacity activeOpacity={0.6} style={styles.containerBtnCancel} onPress={fetchCancelOrder}>
            <Text style={styles.labelCancel}>CANCEL ORDER</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

AdminOrderDetail.propTypes = {
  route: PropTypes.object
}

export default AdminOrderDetail

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
  map: {
    flex: 1
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16
  },
  containerData: {
    flexDirection: 'row',
    marginBottom: 12
  },
  labelData: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: Colors.textGray
  },
  textData: {
    flex: 3,
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: Colors.black
  },
  textStatus: {
    flex: 3,
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    color: Colors.black
  },
  containerTextLink: {
    flex: 3
  },
  textLink: {
    color: Colors.primary,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  containerOrderDetails: {
    marginTop: 4
  },
  labelOrderDetail: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 8
  },
  containerPrice: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between'
  },
  labelPrice: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: Colors.textGray
  },
  textPrice: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: Colors.black
  },
  textTotalPrice: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    color: Colors.primary
  },
  containerTop: {
    backgroundColor: Colors.backgroundSecondary,
    paddingTop: 12,
    paddingBottom: 4,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  containerBottom: {
    backgroundColor: Colors.backgroundPrimary,
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  border: {
    backgroundColor: Colors.border,
    height: 1,
    width: '100%',
    marginBottom: 12
  },
  spacer: {
    flex: 1
  },
  containerButtonUpdate: {
    marginHorizontal: 16,
    marginBottom: 16
  },
  containerBtnCancel: {
    backgroundColor: Colors.white,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: Colors.textRed,
    borderWidth: 2
  },
  labelCancel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: Colors.textRed
  }
})
