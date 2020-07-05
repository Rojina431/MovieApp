import {combineReducers} from 'redux';
import Movies from './Reducer/movieFetch';

 const rootReducer=combineReducers({
     movies:Movies
 })

 export default rootReducer;