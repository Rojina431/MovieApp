import {MOVIE_LOADING,MOVIE_LOADED} from '../ActionType';
import axios from 'axios';
import {API_KEY,API_URL} from '../../config/api'

export const getMovies=()=>dispatch=>{
   dispatch({type:MOVIE_LOADING});
   axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
   .then(resp=>{
       dispatch({
           type:MOVIE_LOADED,
           payload:resp.data
       })
   })
}