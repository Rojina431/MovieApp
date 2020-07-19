import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Button} from 'reactstrap'

export default function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const variable = {
       
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }

    useEffect(() => {




        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favoriteNumber)
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get favoriteNumber')
                }
            })

            axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favorited)
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get favoriteNumber')
                }
            })
        },[])


        const onClickFavorite = () => {
            if(Favorited) {
                // When already added 
    
                axios.post('/api/favorite/removeFavorite', variable)
                .then(response=> {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1 )
                        setFavorited(!Favorited)
                    } else {
                        alert(' Failed to remove from favorite')
                    }
                }).catch(err=>{
                    alert(err.msg +' Error arise')
                })
    
    
    
            } else {
                //When Not adding yet 
            
                axios.post('/api/favorite/addToFavorite', variable)
                .then(response=> {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert(' Failed to add to Favorites')
                    }
                }).catch(err=>{
                    alert(err.response)
                })
            
            }
        }
    
    
        return (
            <div>
                <Button onClick={onClickFavorite} >{Favorited ? " remove from Favorite " : " Add to Favorite "}{FavoriteNumber}</Button>
    
            </div>
        )
}