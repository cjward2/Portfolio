const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Models for moving user document into new collection upon deletion.
const User = require('../models/users');
const DeletedUser = require('../models/deletedUser');

//Profile Routes!!

//GET for user profile
router.get('/user/profile', ensureAuthenticated, (req, res) => {
    res.render('profile.ejs', {name: req.user.name, email: req.user.email, id: req.user._id});
});

//Delete route for user profile
router.delete('/user/profile/:id', (req, res) => {
    User.findById( {_id: req.params.id}, (error, user) => {
        if(error) {
            console.log('error finding user', error);
        } else {
            DeletedUser.insertMany([user], (error, deletedUser) => {
                if(error) {
                    console.log('Error moving user', error);
                } else {
                    console.log('Succesffuly moved', deletedUser);
                }
            });
        }
        User.deleteOne({ _id: req.params.id }, (error, deletedUser) => {
            if(error) {
                console.log('error deleting user', error);
            } else {
                console.log('user deleted', deletedUser);
                req.flash('success_msg', `You're account was successfully deleted. Come back anytime.`);
                res.redirect('/login');
            }
        })
    });
});




module.exports = router;