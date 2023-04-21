import { combineReducers } from 'redux'

import UserReducer from './user-reducer'
import LoadingReducer from './loading-reducer'

export default combineReducers({
  UserReducer,
  LoadingReducer
})
