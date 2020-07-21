import React, {Component, useEffect, useState } from 'react'
import axios from 'axios';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';

 function  Favorite(props) {
    
    const{isAuthenticated}=props.auth

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const variable = {
        //userFrom:props.userFrom,
        movieId: props.movieId,
        movieTitle:props.movieInfo.original_title,
        movieImage:props.movieInfo.backdrop_path,
        movieRunTime:props.movieInfo.runtime
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
               if(isAuthenticated){
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
               }else{
                   alert("Login to remove from favorite")
               }
                
    
            } else {
                //When Not adding yet 
                if(isAuthenticated){
                    axios.post('/api/favorite/addToFavorite', variable)
                    .then(response=> {
                        console.log(props.userFrom)
                        if(response.data.success) {
                            setFavoriteNumber(FavoriteNumber + 1)
                            setFavorited(!Favorited)
                        } else {
                            alert(' Failed to add to Favorites')
                        }
                    }).catch(err=>{
                        alert(err.response)
                    })
                }else{
                    alert('Login to add to favorite')
                }
              
            
            }
        }
              
        
    
    
        return (
            <div>
                <Button onClick={onClickFavorite} >{Favorited ? " remove from Favorite " : " Add to Favorite "}{FavoriteNumber}</Button>
            </div>
        )
    
}

const mapStateToProps=state=>({
    auth:state.users
})


export default connect(mapStateToProps)(Favorite)