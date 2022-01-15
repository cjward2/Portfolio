const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
var cors = require('cors');
const passport = require('passport');

//Enable cors to help with requests
app.use(cors());

const { DB_URI } = require('./config/keys');

//Connect to Mongoose to database
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected!'))
.catch(error => console.log(error));

//Require Pasport from config
require('./config/passport')(passport);

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

//Setup to read data from body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/soberDateRoutes'));
app.use('/', require('./routes/inventoryRoutes'));

const Review = require('./models/reviews');

app.get('/api/reviews/:id', (req, res) => {
  Review.find({ id: req.params.id })
  .then(review => {
    res.json({ review });
  }).catch(err => {
    console.log(err);
    res.status(400).json({ msg: 'Error getting review from database', err: true });
  })
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));