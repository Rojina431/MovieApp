import * as ActionTypes from './actionTypes';

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:localStorage.getItem('token')?true:false,
    isLoading:false,
    user:null
}

export default function(state=initialState,action){
    switch(action.type){
       /* case ActionTypes.USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            }*/
            case ActionTypes.LOGIN_SUCCESS:
            case ActionTypes.REGISTER_SUCCESS:
                console.log('logged in')
                return{
                    ...state,
                   ...action.payload,
                   // token:action.payload.token,
                   // user:action.payload.user,
                    isAuthenticated:true,
                    isLoading:false,
                }  
            case ActionTypes.LOGIN_FAILED:
            case ActionTypes.REGISTER_FAILED:
            case ActionTypes.LOGOUT_SUCCESS:
                localStorage.removeItem('token')
                localStorage.removeItem('creds')
                localStorage.removeItem('user')
                return{
                    token:null,
                    isAuthenticated:false,
                    isLoading:false,
                    user:null
                }            
            default:
                return state;             
    }
}
