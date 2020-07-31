import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Popover } from 'antd';
import { IMG_URL } from '../../../config/api';
import {Table} from 'reactstrap';




function FavoritePage() {

   // const variables = { userFrom: JSON.parse(localStorage.getItem('creds')) }

    const [FavoritedMovies, setFavoritedMovies] = useState([])

    useEffect(() => {

        fetchFavoritedMovies();


    }, [])

    const fetchFavoritedMovies = () => {
        Axios.post('/api/favorite/getFavoritedMovie')
        .then(response => {
            if (response.data.success) {
                localStorage.getItem('creds')
                localStorage.getItem('userId')
                setFavoritedMovies(response.data.favorites)
            } else {
                alert('Failed to get favorited videos')
            }
        })
    }




    const onClickRemove = (movieId) => {
        
        const variable = {
            movieId: movieId,
            //userFrom: localStorage.getItem('creds')
        }

        Axios.post('/api/favorite/removeFavorite', variable)
        .then(response=> {
            if(response.data.success) {
                localStorage.getItem('creds')
                fetchFavoritedMovies();

            } else {
                alert(' Failed to remove from favorite')
            }
        })

    }


    const renderTableBody = FavoritedMovies.map((movie, index) => {


        const content = (
            <div>
                {movie.moviePost ? 
                <img src={`${IMG_URL}w500${movie.moviePost}`} alt="moviePost" />
                : 
                "no Image"    
            }
            </div>
        )

        return <tr >

            <Popover content={content} title={`${movie.movieTitle}`} >

                <td>{movie.movieTitle}</td>

            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>
                Remove from the Favorites</button></td>
        </tr>


    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite Movies</h3>
            <hr />

            <Table bordered className="mx-1">
                <thead>
                    <tr>
                        <th>Movie Title	</th>
                        <th>Movie RunTime	</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>

                    {renderTableBody}

                </tbody>
            </Table>
        </div>
    )
}


export default FavoritePage