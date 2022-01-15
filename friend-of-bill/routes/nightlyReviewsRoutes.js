const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');


router.get('/api/reviews/:id', (req, res) => {
    Review.find({ id: req.params.id })
    .then(review => {
      res.json({ review });
    }).catch(err => {
      console.log(err);
      res.status(400).json({ msg: 'Error getting review from database', err: true });
    })
  });


module.exports = router;