import * as ActionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors } from './errorAction';

//for user register

export const register=({name,email,password})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({name,email,password})

    axios.post('/api/users',body,config)
    .then(res=>{
        localStorage.setItem('token',JSON.stringify(res.data.token));
        localStorage.setItem('creds',JSON.stringify(res.data.user.id))
        dispatch({
        type:ActionTypes.REGISTER_SUCCESS,
        payload:res.data
    })
    }).catch(err=>{
        {
        console.log(returnErrors(err.response.data,err.response.status));
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
        dispatch({type:ActionTypes.REGISTER_FAILED})
    }
    })
}

//for logging in
export const login=({email,password})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({email,password})

    axios.post('/api/auth',body,config)
    .then(res=>{
      
        localStorage.setItem('token',JSON.stringify(res.data.token));
        localStorage.setItem('creds',JSON.stringify(res.data.user.id))
        dispatch({
            type:ActionTypes.LOGIN_SUCCESS,
            payload:res.data
        })
    }).catch(err=>{
        if (err.response && err.response.data){
        console.log(returnErrors(err.response.data,err.response.status));
        dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
        dispatch({type:ActionTypes.LOGIN_FAILED})
        }else{
            console.log(err)
        }
    })
}


//for user logout

export const logout=()=>{
    return{
        type:ActionTypes.LOGOUT_SUCCESS
    }
}

 //setup config/headers and token
 export const tokenConfig = ()=> {
    //get token from localstorage
    const token = localStorage.getItem('token')

    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};


