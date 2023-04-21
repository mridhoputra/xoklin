import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { name as appName } from './app.json'
import { store, persistor } from './src/store'

const Application = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => Application)
