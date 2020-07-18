import {combineReducers} from 'redux';
import Errors from './errorReducer';
import Users from './authReducer';

const rootReducer=combineReducers({
    error:Errors,
    users:Users
})

export default rootReducer;