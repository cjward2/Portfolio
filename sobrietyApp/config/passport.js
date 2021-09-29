const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/users');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        //Match User
        User.findOne({ email: email })
        .then(user => {
            if(!user) {
                return done(null, false, { message: 'That email is not registered!' });
            }
            //Match Password
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if(error) throw error;

                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            });

        })
        .catch(error => console.log('Error in Passport function', error));
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}