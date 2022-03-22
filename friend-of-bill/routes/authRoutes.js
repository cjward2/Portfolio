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
    User.findOne({email: req.body.email})
    .then(user => {
        res.json({ userID: user._id, name: user.name, err: false });
    })
    .catch(err => {
      res.status(400).json({ msg: 'An error occured while logging in', err: true });
    });
  });

//POST register route
router.post('/api/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        //If user already exists tell the front end
        res.json({ msg: 'User already exists', err: true });
        return;
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
            //If user is saved with hashed password tell the front end
            res.json({ msg: 'User saved', err: false });
        })
        .catch(error => {
          res.status(400).json({ msg: 'Error hashing password', err: true });
        });
    }));
      }
    })
});

//Post route for google Oauth flow
router.post('/api/google/auth', (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if(user) {
      //If oauth user already has an account, send that user model up to front end instead of creating a new account
      res.json(user);
    } else {
      const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.googleId,  //Create pseudo password for user to prevent bcrypt from thowing errors on the edge case user registers with oauth and then tries to login through form
        googleImg: req.body.imageUrl,
        googleId: req.body.googleId
    });
      newUser.save()
      .then(user => {
        res.json(user);
      }).catch(err => {
        res.status(400).json({ msg: 'Error saving google User', err: true })
      })
    }
  }).catch(err => {
    res.status(400).json({ msg: 'Error in oauth register route', err: true });
  })
});

module.exports = router;