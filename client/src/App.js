import React from 'react';
import Landingpage from './Components/LandingPage/landing';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import MovieDetail from './Components/LandingPage/movieDetailPage'



function App() {

  const MovieWithId=({match})=>{
    return(
      <React.Fragment>
     <MovieDetail movieId={parseInt(match.params.movieId)} />
     </React.Fragment>
    )}

  return (
  <BrowserRouter>
    <div className="App">
       <Switch> 
       <Route exact path='/' component={()=><Landingpage/>}/>
       <Route exact path='/movie/:movieId' component={MovieWithId}/>
     </Switch>   
    </div>
  </BrowserRouter>  
   
    
  );
}

export default App;
