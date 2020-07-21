import React,{Component} from 'react';
import Landingpage from './Components/LandingPage/landing';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import MovieDetail from './Components/LandingPage/movieDetailPage';
import AppNavbar from './Components/LandingPage/appNavbar/appNavbar';
import {Provider} from 'react-redux';
import store from './store';
import Favorites from './Components/LandingPage/appNavbar/FavoritePage'


const MovieWithId=({match})=>{
  
  return(
    <React.Fragment>
   <MovieDetail movieId={parseInt(match.params.movieId)}  />
   </React.Fragment>
  )}

class App extends Component {
 


render(){

 

  return (
    <Provider store={store}>
    <div className="App">
    <AppNavbar/>
      <BrowserRouter>
      <Switch> 
        <Route exact path='/' component={()=><Landingpage/>}/>
        <Route exact path='/movie/:movieId' component={MovieWithId}/>   
        <Route  path='/favorites' component={()=><Favorites/>}/>
      </Switch> 
    </BrowserRouter>
    </div>  
    </Provider>
      
    );
}


}





export default App;
