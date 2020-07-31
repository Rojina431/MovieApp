import React from 'react';
import {Col} from 'reactstrap';

export default function GridImage(props){

    return(
      <Col lg={6} md={8} xs={24} className="mb-2">
        <div style={{position:'relative'}}>
          <a href={`/movie/${props.movieId}`}>
            <img style={{width:'100%',height:'500px'}} src={props.image} alt="MovieImage"/>
          </a> 
         </div>   
      </Col>   
       
    )
  }

      
