const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const SoberDate = require('../models/sobrietyDate');


// //Models for moving user document into new collection upon deletion.
// const User = require('../models/users');
// const DeletedUser = require('../models/deletedUser');

//Web Scraping
const cheerio = require('cheerio');
const request = require('request');
const deletedUser = require('../models/deletedUser');


//Initialize variables to give global scope
let dailyReflectionHeader;
let dailyReflectionTitle;
let dailyReflectionContent;
//Web Scraper setup to get Daily reflection each day.
request('https://aa.org/pages/en_US/daily-reflection', (error, response, html) => {
    if(!error && response.statusCode ==200) {
     const $ = cheerio.load(html);
     dailyReflectionHeader = $('.daily-reflection-header-content').text();
     dailyReflectionTitle = $('.daily-reflection-content-title').text();
     dailyReflectionContent = $('.daily-reflection-content').text()
    } else {
        console.log(error);
    }
});


//USER ROUTES!

//GET for /user
router.get('/user',  ensureAuthenticated, (req, res) => {
     //Only display sobriety date for specific user
     SoberDate.find({ id: req.user.id }, (error, soberDate) => {
        if(error) {
            console.log('Error in GET /user', error);
        } else {
            res.render('home.ejs', {name: req.user.name, soberDate, dailyReflectionHeader, dailyReflectionTitle, dailyReflectionContent});
        }
    });
});

//POST Route for Sobriety Date
router.post('/user', ensureAuthenticated, (req, res) => {
    console.log(req.body.date);
    let theSobrietyDate = new SoberDate({
        id: req.user._id,
        date: req.body.date
    });
    theSobrietyDate.save((error,soberDate) => {
        if(error)  {
            console.log('Error saving sobriety date', error);
            res.redirect('/user');
        } else {
            res.redirect('/user');
        }
    });
});

//Delete Route for Sobriety Date
router.delete('/user', (req, res) => {
    SoberDate.findOneAndRemove({ id: req.user._id  }, (error, soberDate) => {
        if(error) {
            console.log('error deleting sober date', error)
        } else {
            res.redirect('/user');
        }
    })
});

//On Awakening Route!!

router.get('/user/awakening', ensureAuthenticated, (req, res) => {
    res.render('awakening.ejs');
});

module.exports = router;