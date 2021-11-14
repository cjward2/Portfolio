import axios from 'axios';

//create instance of axios for requests to same base URL
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

//Allow other files access
export default instance;