const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const logger = require('morgan');
const {DB_URI} = require('./config/keys');

//Require Pasport from config
require('./config/passport')(passport);

//Connect to Mongoose to database
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected!'))
.catch(error => console.log(error));

mongoose.set('useFindAndModify', false);

app.use(logger("dev"));
app.use(express.static('public'));
//Setup to read data from form
app.use(express.urlencoded({extended: false}));

//tell express to use method-override
app.use(methodOverride('_method'));

//Express Session
app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

//Passport middlware
app.use(passport.initialize());
app.use(passport.session());

 //Connect flash
 app.use(flash());

 //Global Vars for flash messages- want different colors for different messages
 app.use((req, res, next) => {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     next();
 });


//Routes!
app.use('/', require('./routes/users'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/inventory'));
app.use('/', require('./routes/reviews'));
app.use('/', require('./routes/profile'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`App running on port ${PORT}`));