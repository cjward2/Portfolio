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

 router.post('/api/reviews/new', (req, res) => {
   const { user, formData, checkbox } = req.body;
   let newReview = new Review({
     id: user.id,
     q1: checkbox[0].checked,
     describe1: formData.describe1,
     q2: checkbox[1].checked,
     describe2: formData.describe2,
     q3: checkbox[2].checked,
     describe3: formData.describe3,
     q4: checkbox[3].checked,
     describe4: formData.describe4,
     q5: checkbox[4].checked,
     describe5: formData.describe5,
     q6: checkbox[5].checked,
     describe6: formData.describe6,
     q7: checkbox[6].checked,
     describe7: formData.describe7,
     describe8: formData.describe8,
     q9: checkbox[7].checked,
     describe9: formData.describe9,
     q10: checkbox[8].checked,
     describe10: formData.describe10,
     date: new Date() //So i can show user the date the created review on the front end
   });
   newReview.save()
   .then(review => {
    res.json({ review });
   }).catch(err => {
    res.status(400).json({ msg: 'Error saving review', err: true });
   })
 })

 router.get('/api/review/:id', (req, res) => {
    Review.findById(req.params.id)
    .then(review => {
      res.json({ review })
    }).catch(err => {
      res.status(400).json({ msg: 'Error finding review', err: true })
    })
 });


module.exports = router;