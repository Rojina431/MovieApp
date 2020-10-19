import React, { useState ,useEffect} from 'react';
import {Button,CardBody} from 'reactstrap';
import {API_KEY,API_URL,IMG_URL} from '../../config/api';
import {Table,Row } from 'reactstrap';
import MainImage from './mainImage';
import GridImage from './cardImage'
import Favorite from './favorite.js';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
//import {connect} from 'react-redux'



 function MovieDetail(props){

    const [Movie,setMovie]=useState([]);
    const [Crews,setCrews]=useState([]);
    const [ActorToggle,setActorToggle]=useState(false)
    let history=useHistory();
    useEffect(() => {
        const endpoint = `${API_URL}movie/${props.movieId}?api_key=${API_KEY}&language=en-US`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (path) => {

        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response) 

           fetch(`${API_URL}movie/${props.movieId}/credits?api_key=${API_KEY}`)
            .then(response=>response.json())
            .then(response=>{
                console.log(response)
               setCrews(response.cast)
            })
            
        })
    }
const onClick=()=>{
    history.push('/');
}    

  const handleClick=()=>{
      setActorToggle(!ActorToggle)
} 

    return(
        <React.Fragment>
        <div style={{ width: '100%', margin: 0 }}>

        {/*Movie Main Image  */}  

        {Movie &&
            <MainImage image={`${IMG_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                title={Movie.original_title} text={Movie.overview} />
        }
        </div>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="mr-2">
           <Favorite userFrom={JSON.parse(localStorage.getItem('creds'))} movieId={props.movieId} movieInfo={Movie} /> 
       </div>
        <div className="ml-3">
           <Button onClick={onClick}><span><FontAwesomeIcon icon={faArrowLeft}/></span>Go Back</Button> 
        </div>
       
        {/*Movie info */}
        {Movie &&
        <CardBody> 
            <Table className="mx-1" style={{backgroundColor:'lightgrey'}} bordered>
            <tr className="text-center">
              <th colSpan={8}>Movie Info</th>
            </tr>
            <tr >
              <th>Title</th>
              <th>Release_Date</th>
              <th>Runtime</th>
              <th>Vote_Count</th>
              <th>Vote_Average</th>
              <th>Status</th>
              <th>Popularity</th>
              <th>Revenue</th>
            </tr>
            <tr>
             <td>{Movie.original_title}</td>
             <td>{Movie.release_date}</td>
             <td>{Movie.runtime}</td>
             <td>{Movie.vote_count}</td>
             <td>{Movie.vote_average}</td>
             <td>{Movie.status}</td>
             <td>{Movie.popularity}</td>
             <td>{Movie.revenue}</td>
            </tr>
            </Table>
            </CardBody> 
        }

    <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClick} className="mb-3"> Toggle actor </Button>
    </div>

    {ActorToggle &&
        <Row gutter={[16, 16]}>
            {Crews && Crews.map((crew, index) => (
                <React.Fragment key={index}>
                    {crew.profile_path &&
                        <GridImage
                            actor image={`${IMG_URL}w500${crew.profile_path}`}
                        />
                    }
                </React.Fragment>
            ))}

        </Row>
    }
 </React.Fragment>
    )}



    export default (MovieDetail)