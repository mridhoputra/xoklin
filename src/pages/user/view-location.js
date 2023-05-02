import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { Colors } from '../../assets'
import Gap from '../../components/gap'

const ViewLocation = (props) => {
  const navigation = useNavigation()

  const { coordinate } = props.route.params

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>VIEW LOCATION</Text>
        <Gap width={10} />
      </View>
      <MapView
        region={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0015
        }}
        style={styles.map}
        loadingEnabled={true}
      >
        <Marker coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }} />
      </MapView>
      <View style={styles.containerLocationInfo}>
        <View style={styles.ribbon}/>
        <View style={styles.containerLocationDetail}>
          <Text style={styles.locationTitle}>DETAILS</Text>
          <Text style={styles.locationSubtitle}>Latitude: {coordinate.latitude.toFixed(8)}</Text>
          <Text style={styles.locationSubtitle}>Longitude: {coordinate.longitude.toFixed(8)}</Text>
          <Text style={styles.locationSubtitle}>Address: {coordinate.address}</Text>
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
  map: {
    flex: 1
  },
  containerLocationInfo: {
    position: 'absolute',
    flexDirection: 'row',
    top: 68,
    backgroundColor: Colors.white,
    width: '76%',
    elevation: 2,
    marginHorizontal: 16,
    borderRadius: 8
  },
  containerLocationDetail: {
    padding: 8
  },
  ribbon: {
    backgroundColor: Colors.primary,
    height: '100%',
    width: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  locationTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14
  },
  locationSubtitle: {
    fontFamily: 'Nunito-Regulaar',
    fontSize: 12
  }
})
