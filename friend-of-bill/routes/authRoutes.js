const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/users');


//Login Post route
router.post('/api/login', 
  passport.authenticate('local'),
  function(req, res) {
    console.log(req.body.email);
    User.findOne({email: req.body.email})
    .then(user => {
        console.log(user);
        res.json({ userID: user._id, name: user.name, err: false });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: 'An error occured while logging in', err: true });
    });
  });

//POST register route
router.post('/api/register', (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        //If user already exists tell the front end
        res.json({ msg: 'User already exists', err: true });
      } else {
        const newUser = new User ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password1
      });
      //Hash Password
      bcrypt.genSalt(10, (error, salt) => bcrypt.hash(newUser.password, salt, (error, hash) => {
        if(error) throw error;
        //Set password to hashed
        newUser.password = hash;
        //Save User
        newUser.save()
        .then(user => {
            console.log(user);
            //If user is saved with hashed password tell the front end
            res.json({ msg: 'User saved', err: false });
        })
        .catch(error => {
          console.log('Error hasing password', error);
          res.json({ msg: 'Error hashing password', err: true });
        });
    }));
      }
    })
});

module.exports = router;