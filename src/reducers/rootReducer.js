import authReducer from './authReducer'
import homeReducer from './homeReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer,
})

export default rootReducer