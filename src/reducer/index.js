import { combineReducers } from 'redux'

import UserReducer from './user-reducer'
import CartReducer from './cart-reducer'
import LoadingReducer from './loading-reducer'

export default combineReducers({
  UserReducer,
  CartReducer,
  LoadingReducer
})
