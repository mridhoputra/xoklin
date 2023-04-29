import PropTypes from 'prop-types'
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import Gap from '../../components/gap'
import Button from '../../components/button'
import formatRupiah from '../../utils/formatRupiah'

const CardDetail = (props) => {
  const { dataOrder } = props.route.params ?? {}

  const navigation = useNavigation()
  const [modalVisible, setModalVisibile] = useState(false)

  const deliveryFee = 5000

  const toggleModalVisibility = () => {
    setModalVisibile(!modalVisible)
  }

  const onSubmit = () => {
    toggleModalVisibility()
    const body = dataOrder
    dataOrder.amount = dataOrder.subtotal + deliveryFee
    console.log(dataOrder)
  }

  const navigateToHome = () => {
    toggleModalVisibility()
    navigation.reset({ index: 0, routes: [{ name: 'UserHome' }] })
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>CART DETAILS</Text>
        <View />
      </View>
      <View style={styles.profile}>
        <View style={styles.containerProfile}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.avatar}/>
          <View style={styles.containerProfileDetail}>
            <Text style={styles.profileName}>Mr. Harry Maguire</Text>
            <Text style={styles.profileNumber}>085789012345</Text>
          </View>
        </View>
        <View style={styles.containerProfileLocation}>
          <Text style={styles.profileLabel}>Address:</Text>
          <Text style={styles.profileAddress}>{dataOrder.address}</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.textLink}>See Location</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.border}/>
      <View style={styles.content}>
        <View style={styles.containerOrderDetail}>
          <Text style={styles.textOrderDetails}>Order Details</Text>
          {dataOrder.order.length > 0
            ? (
              dataOrder.order.map((item, index) => (
                <View key={index} style={styles.containerDataItem}>
                  <Text style={styles.textItemName}>{item.item} x {item.count}</Text>
                  <Text style={styles.textItemPrice}>{formatRupiah(item.total)}</Text>
                </View>
              ))
            )
            : (
              <View style={styles.containerDataItem}>
                <Text style={styles.textItemName}>No item selected.</Text>
              </View>
            )}
          <View style={styles.borderSmall}/>
          <View style={styles.containerDataItem}>
            <Text style={styles.textSubtotal}>Subtotal</Text>
            <Text style={styles.textItemPrice}>{formatRupiah(dataOrder.subtotal)}</Text>
          </View>
        </View>
        <View style={styles.containerOrderFee}>
          <View style={styles.containerDataItem}>
            <Text style={styles.labelDeliveryFee}>Delivery Fee</Text>
            <Text style={styles.textDeliveryFee}>{formatRupiah(deliveryFee)}</Text>
          </View>
          <View style={styles.containerDataItem}>
            <Text style={styles.labelTotalPrice}>Total Price</Text>
            <Text style={styles.textTotalPrice}>{formatRupiah(dataOrder.subtotal + deliveryFee)}</Text>
          </View>
        </View>
        <Text style={styles.labelPaymentMethod}>PAYMENT METHOD</Text>
        <View style={styles.containerPaymentMethod}>
          <Image source={require('../../assets/images/icon_cash.png')} style={styles.iconCash}/>
          <Gap width={20}/>
          <View>
            <Text style={styles.labelPayment}>Cash</Text>
            <Text style={styles.labelPaymentDescription}>Cash Payment after the laundry is complete</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}/>
        <View style={styles.containerButtonCheckout}>
          <Button label='CHECKOUT' onPress={onSubmit}/>
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisibility}
      >
        <TouchableOpacity activeOpacity={1} onPress={toggleModalVisibility} style={styles.modal}>
          <View style={styles.containerModal}>
            <View style={styles.containerImage}>
              <Image source={require('../../assets/images/icon_success_white.png')} />
            </View>
            <Text style={styles.titleModal}>Request Success</Text>
            <Text style={styles.subtitleModal}>Thank you for using our service. We will contact you soon to pick up your items.</Text>
            <Button label='BACK TO HOME' onPress={navigateToHome}/>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  )
}

export default CardDetail

CardDetail.propTypes = {
  route: PropTypes.object
}

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
  btnBack: {
    width: 10,
    height: 18
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.primary
  },
  profile: {
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16
  },
  containerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  avatar: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2
  },
  containerProfileDetail: {
    marginLeft: 20
  },
  profileName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: Colors.black
  },
  profileNumber: {
    fontFamily: 'Nunito-Light',
    fontSize: 14,
    color: Colors.black
  },
  containerProfileLocation: {
  },
  profileLabel: {
    fontFamily: 'Nunito-Light',
    fontSize: 14,
    color: Colors.black
  },
  profileAddress: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.black,
    marginTop: 2,
    marginBottom: 4
  },
  textLink: {
    color: Colors.primary,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flex: 1
  },
  containerOrderDetail: {
    backgroundColor: Colors.backgroundSecondary,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  textOrderDetails: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: Colors.primary
  },
  containerDataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },
  textItemName: {
    fontFamily: 'Nunito-Light',
    fontSize: 14,
    color: Colors.textGrayLight,
    flex: 1
  },
  textItemPrice: {
    fontFamily: 'Nunito-SemiBold ',
    fontSize: 14,
    color: Colors.primary
  },
  textSubtotal: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textGrayLight,
    flex: 1
  },
  containerOrderFee: {
    backgroundColor: Colors.backgroundPrimary,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  labelDeliveryFee: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.black
  },
  textDeliveryFee: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.black
  },
  labelTotalPrice: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.black
  },
  textTotalPrice: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.black
  },
  labelPaymentMethod: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: Colors.primary,
    marginTop: 24,
    marginBottom: 16
  },
  containerPaymentMethod: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginVertical: 8
  },
  iconCash: {
    width: 44,
    height: 24
  },
  labelPayment: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: Colors.black
  },
  labelPaymentDescription: {
    fontFamily: 'Nunito-Light',
    fontSize: 10,
    color: Colors.textGrayLight
  },
  containerButtonCheckout: {
  },
  border: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.border
  },
  borderSmall: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border
  },
  modal: {
    flex: 1,
    justifyContent: 'center'
  },
  containerModal: {
    marginHorizontal: 40,
    paddingHorizontal: 24,
    paddingVertical: 36,
    backgroundColor: Colors.white,
    alignItems: 'center',
    elevation: 2,
    borderRadius: 12
  },
  containerImage: {
    marginVertical: 24,
    backgroundColor: Colors.green,
    width: 128,
    height: 128,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleModal: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: Colors.black
  },
  subtitleModal: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.black,
    marginTop: 8,
    marginBottom: 20
  }
})
