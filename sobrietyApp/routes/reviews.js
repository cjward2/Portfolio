const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Review = require('../models/reviews');

//Nightly Review Routes!!

//GET for Nightly Reviews
router.get('/user/reviews', ensureAuthenticated, (req, res) => {
    Review.find({ id: req.user.id }, (error, reviews) => {
        if(error) {
            console.log('Error in GET /user/reviews', error);
        } else {
            res.render('reviews.ejs', {reviews});
        }
    })
    
});

//GET route for new review form
router.get('/user/reviews/new', ensureAuthenticated, (req, res) => {
    res.render('newReview.ejs');
})

//POST route for saving nightly reviews
router.post('/user/reviews', ensureAuthenticated, (req, res) => {
    //Take data from req.body and save to db
    let theReview = new Review({
        id: req.user._id,
        q1: req.body.q1,
        describe1: req.body.describe1,
        q2: req.body.q2,
        describe2: req.body.describe2,
        q3: req.body.q3,
        describe3: req.body.describe3,
        q4: req.body.q4,
        describe4: req.body.describe4,
        q5: req.body.q5,
        describe5: req.body.describe5,
        q6: req.body.q6,
        describe6: req.body.describe6,
        q7: req.body.q7,
        describe7: req.body.describe7,
        describe8: req.body.describe8,
        q9: req.body.q9,
        describe9: req.body.describe9,
        q10: req.body.q10,
        describe10: req.body.describe10,
        date: new Date()
    });
    theReview.save((error, review) => {
        if(error) {
            console.log('Error saving nightly review in POST /user/reviews', error);
            res.render('newReview.ejs');
        } else {
            res.redirect(`/user/reviews/${review._id}`);
        }
    });
});


//GET for nightly review show route
router.get('/user/reviews/:id', ensureAuthenticated, (req, res) => {
    Review.findById(req.params.id, (error, review) => {
        if(error) {
            console.log('Error in show route at GET /user/reviews/:id', error);
            res.redirect('/user/reviews');
        } else {
            // console.log(review);
            res.render('showReview.ejs', {review});
        }
    });
});

//delete route for nightly reviews
router.delete('/user/reviews/:id', (req, res) => {
    Review.findByIdAndDelete(req.params.id, (error, review) => {
        if(error) {
            console.log('Error in destroy route', error);
            req.flash('error_msg', `An error occurred. Please try again later.`);
            res.redirect('/user/reviews');
        } else {
            req.flash('success_msg', `Review successfully deleted!`);
            res.redirect('/user/reviews');
        }
    });
});


module.exports = router;