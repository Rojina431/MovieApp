import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import {connect} from 'react-redux'
 

function Favorite(props) {
    const {isAuthenticated}=props.auth

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const movieImage = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        movieImage: movieImage,
        movieRunTime: movieRunTime
    }
    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })

    }, [])

    const onClickFavorite = () => {

        if (Favorited) {
            //when we are already logged in
            if(isAuthenticated){
            axios.post('/api/favorite/removeFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                }).catch(err=>{
                    alert(err.msg)
                })
            }else{
                alert('Please login to add remove from favorite')
            }
        } else {
            // when we are not logged in yet
         if(isAuthenticated){
            axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Failed to Add To Favorite')
                }
            }).catch(err=>{
                alert(err.msg)
            })
            
         }else{
             alert('Please login to add to favorite')
         }  
        }
    }

    return (
            <Button onClick={onClickFavorite} > {!Favorited ? "Add to Favorite" : "Remove from Favorite"} {FavoriteNumber}</Button>
    )
}

const mapStateToProps=state=>({
    auth:state.users
})

export default connect(mapStateToProps)(Favorite)