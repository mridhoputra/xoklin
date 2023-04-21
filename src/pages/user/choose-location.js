import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Platform, PermissionsAndroid, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import React, { useRef, useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { GOOGLE_MAPS_API_KEY } from '@env'

import { Colors } from '../../assets'
import Button from '../../components/button'
import axios from 'axios'

const ChooseLocation = () => {
  const mapRef = useRef(null)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [position, setPosition] = useState({
    altitude: 0,
    latitude: -2.9832758,
    longitude: 104.7320313,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0015,
    address: ''
  })

  const getCurrentLocation = () => {
    dispatch({ type: 'SET_LOADING', value: true })
    Geolocation.getCurrentPosition(
      async (position) => {
        const result = position.coords
        setAddressLocation(result.altitude, result.latitude, result.longitude, 0.0022, 0.0015)
        mapRef.current?.animateToRegion(position, 3000)
      },
      (error) => {
        alert(`Maaf, terjadi kesalahan sistem, kode: ${error.code}`)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
    dispatch({ type: 'SET_LOADING', value: false })
  }

  const setAddressLocation = async (altitude, latitude, longitude, latitudeDelta, longitudeDelta) => {
    try {
      const response = await axios.get(`https://maps.google.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`)
      const resultAddress = response?.data?.results[0]?.formatted_address
      setPosition(state => ({
        ...state,
        altitude,
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
        address: resultAddress
      }))
    } catch (e) {
      ToastAndroid.show('Fetch address name failed', ToastAndroid.LONG)
      setPosition(state => ({
        ...state,
        altitude,
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
        // address: resultAddress
      }))
    }
  }

  const handleMapsLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (isGranted) {
          getCurrentLocation()
        } else {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation()
          } else {
            alert('Location permission denied')
          }
        }
      } else {
        getCurrentLocation()
      }
    } catch {
      alert('Get current location error, please contact the developer')
    }
  }

  const setCoordinate = () => {
    navigation.navigate({ name: 'UserChooseItem', params: { coordinate: position }, merge: true })
  }

  useEffect(() => {
    handleMapsLocation()
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>PIN ON MAP</Text>
        <View />
      </View>
      <MapView
        ref={mapRef}
        region={position}
        style={styles.map}
        loadingEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={(region) => {
          setAddressLocation(0, region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta)
        }}
      >
        <Marker coordinate={position} />
      </MapView>
      <View style={styles.containerLocationInfo}>
        <View style={styles.ribbon}/>
        <View style={styles.containerLocationDetail}>
          <Text style={styles.locationTitle}>CURRENT LOCATION</Text>
          <Text style={styles.locationSubtitle}>Latitude: {position.latitude.toFixed(8)}</Text>
          <Text style={styles.locationSubtitle}>Longitude: {position.longitude.toFixed(8)}</Text>
          <Text style={styles.locationSubtitle}>Address: {position.address}</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <Button label='SET PICKUP' width='92%' onPress={setCoordinate}/>
      </View>
    </View>
  )
}

export default ChooseLocation

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
  },
  containerButton: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
})
