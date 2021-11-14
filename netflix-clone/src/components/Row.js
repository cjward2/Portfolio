import React, {useState, useEffect} from 'react'
import axios from '../axios';
import './Row.css';

const Row = ({ title, fetchUrl, isLargeRow=false }) => {
    const [movies, setMovies] = useState([]);

    //Base url for image paths
    const baseUrl = "https://image.tmdb.org/t/p/original/";

    //UseEffect with fethUrl dependency
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);

            return request;
        }

        fetchData();

    }, [fetchUrl]);

   // console.log(movies)

    return (
        <div className="row">
            <h2>{ title }</h2>

            <div className="row__posters">
            { movies.map(movie => (
                // run check to see if poster path exists before rendering to screen --> I dont want to see broken images
                ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                    <img className="row__posterLarge"
                    key={ movie.id } src={`${baseUrl}${movie.poster_path}`} alt={ movie.name } />
                )) 
                )
               }
            </div>
        </div>
    )
}

export default Row
