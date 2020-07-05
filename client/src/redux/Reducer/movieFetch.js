import {MOVIE_LOADING,MOVIE_LOADED} from '../ActionType';

const initialState={
    movies:[],
    isLoading:false,
    err:null
}

const Movies=(state=initialState,action)=>{
    switch(action.type){
        case MOVIE_LOADING:
            return{
                ...state,
                movies:[],
                isLoading:true,
                err:null
            }
        case MOVIE_LOADED:
            const movie=action.payload
            console.log(movie.results)
            return{
                  ...state,
                  movies:movie,
                  isLoading:false,
                  err:null
            }   
            default:
                return state; 
    }

}
export default Movies;