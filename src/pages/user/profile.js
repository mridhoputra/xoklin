import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import ButtonSecondary from '../../components/button-secondary'
import Gap from '../../components/gap'

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Tidak', style: 'cancel' },
        {
          text: 'Ya',
          style: 'default',
          onPress: async () => {
            await dispatch({
              type: 'LOGOUT'
            })
            navigation.reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] })
          }
        }
      ],
      { cancelable: true }
    )
  }

  return (
    <View style={styles.page}>
      <ImageBackground source={require('../../assets/images/bg_profile.png')} style={styles.bgHeader}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
          </TouchableOpacity>
          <Text style={styles.title}>PROFILE</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
            <Image source={require('../../assets/images/icon_profile_logout.png')} style={styles.btnLogout}/>
          </TouchableOpacity>
        </View>
        <View style={styles.spacer}/>
        <Image source={require('../../assets/images/avatar.png')} style={styles.avatar}/>
      </ImageBackground>
      <View style={styles.card}>
        <View style={styles.containerDataProfile}>
          <Image source={require('../../assets/images/icon_profile_fullname.png')} style={styles.iconProfile}/>
          <Text style={styles.textDataProfile}>{userData.fullname}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.containerDataProfile}>
          <Image source={require('../../assets/images/icon_profile_email.png')} style={styles.iconProfile}/>
          <Text style={styles.textDataProfile}>{userData.email}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.containerDataProfile}>
          <Image source={require('../../assets/images/icon_profile_phone.png')} style={styles.iconProfile}/>
          <Text style={styles.textDataProfile}>{userData.phone}</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <ButtonSecondary label='EDIT PROFILE' />
        <Gap height={20} />
        <ButtonSecondary label='CHANGE PASSWORD' />
      </View>
    </View>
  )
}

export default UserProfile

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
  avatar: {
    alignSelf: 'center',
    width: 92,
    height: 92,
    top: 12
  },
  card: {
    marginTop: 46,
    borderRadius: 16,
    elevation: 5,
    padding: 20,
    backgroundColor: Colors.white,
    marginHorizontal: 16
  },
  containerDataProfile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconProfile: {
    width: 24,
    height: 24
  },
  textDataProfile: {
    flex: 1,
    marginLeft: 16,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.black
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: '#0000000D',
    marginVertical: 12
  },
  containerButton: {
    marginHorizontal: 24,
    marginTop: 40
  }
})
