import * as ActionTypes from './actionTypes';

const initialState={
    msg:{},
    status:null,
    id:null
}

export default function(state=initialState,action){
   switch(action.type){
       case ActionTypes.GET_ERROR:
        const msg=action.payload.msg;
        console.log(msg)
           return{
               ...state,
               msg:msg,
               status:action.payload.status,
               id:action.payload.id
           }
          
        case ActionTypes.CLEAR_ERROR:
            return{
                ...state,
                msg:{},
                status:null,
                id:null
            }   
        default:
            return state;    
   }
}