//bring in api key
import { tmdb_key } from "./config";

const requests = {
    fetchTrending: `/trending/all/week?api_key=${tmdb_key}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${tmdb_key}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${tmdb_key}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${tmdb_key}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${tmdb_key}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${tmdb_key}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${tmdb_key}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${tmdb_key}&with_genres=99`,
};

export default requests;

