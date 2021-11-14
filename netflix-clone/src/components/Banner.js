import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../Requests';
import './Banner.css';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    //Run useEffect when banner component mounts
    useEffect(() => {
        //Make call to API and update state with data from request. Set up to pick random Movie from resulting data so banner changes randomly
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length -1)])

            return request;
        }
        //Call function to actually get data!
        fetchData();

    }, [])

    //console.log(movie);
    //function to control length of description, so long decriptions don't throw off styling. Take string and number of characters as params
    function truncate(string, n) {
        //If string exists check length and return substr if condition is met, else return string
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }

    // console.log(movie.backdrop_path);

    return (
        // Run check on background image url b/c movie.backdrop_path is initially undefined so throws console error. This check fixes that
        <header className="banner" style={{ backgroundSize: "cover", backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, backgroundPosition: "center center" }}>
            
            <div className="banner__contents">
                <h1 className="banner__title">
                    {/* account for different info coming back for random movie */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {/* use truncate function from above here */}
                    {
                        truncate(movie?.overview, 150)
                    }
                </h1>
            </div>

            <div className="banner--fadeBottom" />

        </header>
    )
}

export default Banner
