import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Colors } from '../../assets'
import Button from '../../components/button'
import ButtonSecondary from '../../components/button-secondary'
import Gap from '../../components/gap'

const WelcomeScreen = () => {
  const navigation = useNavigation()
  return (
    <View>
      <View style={styles.bgImage}>
        <Image source={require('../../assets/images/logo_white.png')} style={styles.image}/>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Laundry Delivery Solution</Text>
        <Text style={styles.subtitle}>Helping you when you don't have time to wash and ready to serve you at home</Text>
        <Gap height={40} />
        <Button label='LOGIN' onPress={() => navigation.navigate('Login')}/>
        <Gap height={12} />
        <ButtonSecondary label='REGISTER' onPress={() => navigation.navigate('Register')}/>
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  bgImage: {
    height: 300,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 196,
    height: 196
  },
  container: {
    padding: 24,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 24,
    color: Colors.black,
    marginBottom: 24
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
    paddingHorizontal: 24
  }
})
