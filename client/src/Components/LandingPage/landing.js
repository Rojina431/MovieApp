import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMG_URL } from '../../config/api'
import { Col,Button, Row } from 'reactstrap';
import MainImage from './mainImage';
import GridImage from './cardImage'


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (path) => {

        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies,  ...response.results]) 
            setCurrentPage(response.page)
        })
    }

    const handleClick = () => { 
        const endpoint =  `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width: '100%', margin: 0 }}  >


            {/* Movie Main Image  */}
            {Movies[0] &&
                <MainImage image={`${IMG_URL}w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`}
                    title={Movies[0].original_title} text={Movies[0].overview} />
            }

            {/* Body  */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h1> Movies by latest</h1>
                <hr />

                {/* Grid Cards */}

                <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridImage
                                    image={movie.poster_path && `${IMG_URL}w500${movie.poster_path}`}
                                    movieId={movie.id}
                                />
                            </React.Fragment>
                        ))}

                </Row>


                {/* Load More Button  */}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleClick}> Load More </Button>
                </div>

            </div>

        </div>
    )
}

export default LandingPage

