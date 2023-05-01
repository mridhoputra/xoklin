import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  cartData: []
}

const setToAsyncStorage = async (type, payload) => {
  await AsyncStorage.setItem(type, JSON.stringify(payload))
}

const clearAsyncStorage = async () => {
  await AsyncStorage.clear()
}

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CART':
    setToAsyncStorage('cartData', action.cart)
    return {
      ...state,
      cartData: action.cart
    }
  case 'CLEAR_CART':
    clearAsyncStorage()
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default CartReducer
