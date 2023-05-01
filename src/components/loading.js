import React from 'react'
import { StyleSheet, Dimensions, Text, View, ActivityIndicator } from 'react-native'
import { Colors } from '../assets'

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLoading}>
        <ActivityIndicator size='large' color='#45AAF2'/>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLoading: {
    backgroundColor: Colors.white,
    elevation: 2,
    paddingVertical: 36,
    paddingHorizontal: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  text: {
    marginTop: 8,
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: Colors.primary
  }
})

export { styles }

export default Loading
