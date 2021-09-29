const express = require('express');
const app = express();
const $fetch = require('node-fetch');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

//Initialize variable
let cityId;
app.get('/results', (req, res, next) => {
    //grab city value enetered by user
    let city = req.query.city;
    //fetch first endpoint to access woeid to pull 5 day forecast
    $fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
    .then(response => {
        //if response object has network error status throw error with message
        if(!response.ok) {
            throw Error ('Sorry there was a network error! Try again later!')
        }
        //parse json
        return response.json();
    })
    .then(data => {
        //if search returns no results throw error no results found
        if(data.length === 0) {
            throw Error('Sorry, no results found')
        }
        //assign data[0].woeid to variable
        cityId = data[0].woeid;
        //if data is sucessufully recieved moved to next route handler
        next();
        // console.log(data[0].woeid);
        //fetch second endpoint by passing through woeid attained from first fetch
       
    })
    //catch all errors and render error page passing a key/value error down
    .catch(error => {
        console.log(error);
        res.render('error.ejs', {error})
    })
});



app.get('/results', (req, res) => {
    $fetch(`https://www.metaweather.com/api/location/${cityId}/`)
    .then(response => {
        //if response is not ok throw error
        if(!response.ok) {
            throw Error ('Sorry there was a network error! Try again later')
        }
        return response.json();
    })
    .then(data => {
        //pop off last value of array to only have a 5 day forecast
        let removeDaySix = data.consolidated_weather.pop();
        //console logs to check data coming back
        // console.log(data2.title);
        // console.log(data2.parent.title)
        // console.log(data2.time)
        //console.log(data2.consolidated_weather);
        //render results file and pass down several needed values
        res.render('results.ejs', {data: data.consolidated_weather, searchCity: data.title, searchState: data.parent.title, searchTime: data.time})
    })
    .catch(error => {
        console.log(error);
        res.render('error.ejs', {error})
    })
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`App on port ${PORT}`));