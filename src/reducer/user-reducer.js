import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  userData: {},
  isLogin: false
}

const setToAsyncStorage = async (type, payload) => {
  await AsyncStorage.setItem(type, JSON.stringify(payload))
}

const clearAsyncStorage = async () => {
  await AsyncStorage.clear()
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SIGN_IN':
    setToAsyncStorage('userData', action.user)
    return {
      ...state,
      isLogin: true,
      userData: action.user,
      citizenData: action.citizen,
      employeeData: action.employee
    }
  case 'SIGN_OUT':
    clearAsyncStorage()
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default UserReducer
