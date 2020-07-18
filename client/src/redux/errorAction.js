import * as ActionTypes from './actionTypes';

//Return error
export const returnErrors=(msg,status,id=null)=>{
   return{
       type:ActionTypes.GET_ERROR,
       payload:{msg,status,id}
   }
}

//clear error
export const clearErrors=()=>{
    return{
        type:ActionTypes.CLEAR_ERROR
    }
}