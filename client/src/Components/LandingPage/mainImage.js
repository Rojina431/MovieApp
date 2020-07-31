import React from 'react';
import {Card,CardImg,CardImgOverlay,CardText,CardTitle} from 'reactstrap';

export default function MainImage(props){
    return(
        <div  style={{width:'100%'}} >
        <Card>
           <CardImg src={props.image}/>
           <CardImgOverlay style={{textAlign:'bottom'}}>
              <CardTitle style={{color:"white"}} ><h3>{props.title}</h3></CardTitle>
              <CardText style={{color:"white"}}><h6>{props.text}</h6></CardText>
           </CardImgOverlay>
        </Card>
      </div>
    )
}