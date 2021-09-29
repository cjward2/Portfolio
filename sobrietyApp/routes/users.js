const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/users');
const { ensureAuthenticated} = require('../config/auth');


//Root Route
router.get('/', (req, res) => {
    res.render('index.ejs');
});


//Login Page
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

//register page
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

//POST register route
router.post('/register', (req, res) => {
    //object detructuring to pull each value form req.body and store in respective variable
   const {name, email, password, password2} = req.body;

   //Form Validation for Register form
   let errors = [];
   //Make sure all fields filled in
    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }
    //Check passwords match
    if(password !== password2) {
        errors.push({msg: 'Password do not match'});
    }
    //Password length must at least 6 characters long.
    if(password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters long'});
    }
    //If there are any errors, re-render registration form
    if(errors.length > 0) {
        //render regiter page and pass down vars
        res.render('register.ejs', {errors, name, email, password, password2});
    } else {
        //Validation Passes
        User.findOne({email: email})
        .then(user => {
            if(user) {
                //User exists
                errors.push({msg: 'Email is already registered!'})
                res.render('register.ejs', {errors, name, email, password, password2});
            } else {
                const newUser = new User ({
                    name: name,
                    email: email,
                    password: password
                });
                //Hash Password
                bcrypt.genSalt(10, (error, salt) => bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if(error) throw error;
                    //Set password to hashed
                    newUser.password = hash;
                    //Save User
                    newUser.save()
                    .then(user => {
                        //if new user is successfully saved, then pass success msg and redirect to login. Flash message will display upon redirect
                        req.flash('success_msg', 'You are now registered and can log in!');
                        res.redirect('/login')
                    })
                    .catch(error => console.log('Error hasing password', error));
                }));
            }
        });
    }

});

//Login POST route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: true
    }) (req, res, next);
});


//Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});


module.exports = router;