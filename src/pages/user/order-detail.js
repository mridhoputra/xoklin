import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { Colors } from '../../assets'
import Gap from '../../components/gap'
import { formatStatus } from '../../utils/formatStatus'
import formatRupiah from '../../utils/formatRupiah'

const ViewLocation = (props) => {
  const navigation = useNavigation()

  const { orderDetail } = props.route.params

  const deliveryFee = 5000
  const latitude = parseFloat(orderDetail.latitude)
  const longitude = parseFloat(orderDetail.longtitude)

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>ORDER DETAILS</Text>
        <Gap width={10} />
      </View>
      <MapView
        region={{
          latitude: isNaN(latitude) ? -2.9832758 : latitude,
          longitude: isNaN(longitude) ? 104.7320313 : longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0015
        }}
        style={styles.map}
        loadingEnabled={true}
      >
        <Marker
          icon={require('../../assets/images/icon_marker.png')}
          coordinate={{
            latitude: isNaN(latitude) ? -2.9832758 : latitude,
            longitude: isNaN(longitude) ? 104.7320313 : longitude
          }} />
      </MapView>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.containerData}>
            <Text style={styles.labelData}>Status:</Text>
            <Text style={[styles.textStatus,
              orderDetail.status === 0
                ? { color: Colors.red }
                : orderDetail.status === 6
                  ? { color: Colors.primary }
                  : { color: Colors.yellow }
            ]}>{formatStatus(orderDetail.status)}</Text>
          </View>
          <View style={styles.containerData}>
            <Text style={styles.labelData}>Order ID:</Text>
            <Text style={styles.textData}>{orderDetail.idOrder}</Text>
          </View>
          <View style={styles.containerData}>
            <Text style={styles.labelData}>Address:</Text>
            <Text style={styles.textData}>{orderDetail.address}</Text>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <Text style={styles.labelOrderDetail}>Order Details</Text>
          {orderDetail.order.map((item, index) => {
            return (
              <View key={index} style={styles.containerPrice}>
                <Text style={styles.textPrice}>{item.item} x {item.count}</Text>
                <Text style={styles.textPrice}>{formatRupiah(item.total)}</Text>
              </View>
            )
          })}
          <View style={styles.border} />
          <View style={styles.containerPrice}>
            <Text style={styles.labelPrice}>Subtotal:</Text>
            <Text style={styles.textPrice}>{formatRupiah(orderDetail.ammount - deliveryFee)}</Text>
          </View>
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
  )
}

ViewLocation.propTypes = {
  route: PropTypes.object
}

export default ViewLocation

const styles = StyleSheet.create({
  page: {
    flex: 1,
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
  container: {
    position: 'absolute',
    bottom: 24,
    backgroundColor: Colors.white,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    elevation: 2,
    borderRadius: 8
  },
  containerTop: {
    padding: 16,
    paddingBottom: 8
  },
  containerData: {
    flexDirection: 'row',
    marginBottom: 8
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
  containerBottom: {
    backgroundColor: Colors.backgroundPrimary,
    padding: 16,
    paddingBottom: 8
  },
  labelOrderDetail: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: Colors.black,
    marginBottom: 4
  },
  containerPrice: {
    flexDirection: 'row',
    marginBottom: 8,
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
  border: {
    backgroundColor: Colors.border,
    height: 1,
    width: '100%',
    marginBottom: 8
  }
})
