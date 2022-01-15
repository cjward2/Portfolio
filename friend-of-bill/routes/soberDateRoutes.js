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
     dailyReflectionP2 = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:nth-child(3)').text();
    } else {
        console.log(error);
    }
});

router.get('/api/dailyReflection', (req, res) => {
    res.json({ dailyReflectionTitle, dailyReflectionP1, dailyReflectionPageNumber, dailyReflectionP2 })
});

router.get('/api/soberdate/:id', (req, res) => {
  //Only display sobriety date for specific user
  console.log(req.params.id);
  SoberDate.find({ id: req.params.id })
  .then(soberDate => {
    console.log(soberDate)
    res.json({ soberDate })
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ msg: 'Error finding Sobriety date' })
  })
});

router.post('/api/soberdate', (req, res) => {
    const { user, formData } = req.body;
    let newSoberDate = new SoberDate({
      id: user.id,
      date: formData.soberDate
    });
    newSoberDate.save()
    .then(soberDate => {
      res.json({ soberDate });
    }).catch(err => {
      res.status(400).json({ msg: 'Error saving Sober Date', err: true });
    })
});

module.exports = router;