const express = require('express');
const router = express.Router();

//Load Sober Date Model
const SoberDate = require('../models/sobrietyDate');

//Web Scraping
const cheerio = require('cheerio');
const request = require('request');

//Initialize variables to give global scope
let dailyReflectionTitle;
let dailyReflectionP1;
let dailyReflectionPageNumber;
let dailyReflectionP2;
//Web Scraper setup to get Daily reflection each day.
request('https://aa.org/pages/en_US/daily-reflection', (error, response, html) => {
    if(!error && response.statusCode ==200) {
     const $ = cheerio.load(html);
     dailyReflectionTitle = $('article.node.node--type-daily-reflection.node--view-mode-teaser-2 > h3').text();
     dailyReflectionP1 = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:first-child').text();
     dailyReflectionPageNumber = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:nth-child(2)').text();
     //The website im scraping from keeps alternating the 3rd and fourth paragraphs so adding a check to account for these sudden changes
     if($('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:nth-child(4)').html() === '&nbsp;') {
      dailyReflectionP2 = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:nth-child(3)').text();
     } else {
      dailyReflectionP2 = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:nth-child(4)').text();
     }
    } else {
        console.log(error);
    }
});

//Get route to send daily reflections to front end
router.get('/api/dailyReflection', (req, res) => {
    res.json({ dailyReflectionTitle, dailyReflectionP1, dailyReflectionPageNumber, dailyReflectionP2 });
});

//Get route for user sobriety Date
router.get('/api/soberdate/:id', (req, res) => {
  //Only display sobriety date for specific user
  SoberDate.find({ id: req.params.id })
  .then(soberDate => {
    res.json({ soberDate })  //Send sober date back to front end
  })
  .catch(err => {
    //In case of an error alert the front end
    res.status(404).json({ msg: 'Error finding Sobriety date' });
  })
});

//Post route for user creating new sober date
router.post('/api/soberdate', (req, res) => {
    const { user, formData } = req.body;
    //Create new instance of sobreity date
    let newSoberDate = new SoberDate({
      id: user.id,
      date: formData.soberDate
    });
    newSoberDate.save()  //Save that instance to DB
    .then(soberDate => {
      res.json({ soberDate }); //Then send it back to front end
    }).catch(err => {
      res.status(400).json({ msg: 'Error saving Sober Date', err: true });
    })
});

module.exports = router;