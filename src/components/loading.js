import React from 'react'
import { StyleSheet, Dimensions, Text, View, ActivityIndicator } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#45AAF2'/>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  text: {
    marginTop: 8,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
})

export { styles }

export default Loading
