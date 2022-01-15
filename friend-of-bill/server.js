const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
var cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcryptjs');

//Enable cors to help with requests
app.use(cors());

const { DB_URI } = require('./config/keys');
// Load User model
const User = require('./models/users');
//Load Sober Date Model
const SoberDate = require('./models/sobrietyDate');
const Inventory = require('./models/inventory');

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

//Login Post route
app.post('/api/login', 
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
app.post('/api/register', (req, res) => {
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

//Web Scraping
const cheerio = require('cheerio');
const request = require('request');

//Initialize variables to give global scope
let dailyReflectionTitle;
let dailyReflectionP1;
let dailyReflectionPageNumber;
let dailyReflectionP2;
//Web Scraper setup to get Daily reflection each day.
request('https://aa.org/pages/en_US/daily-reflection', (error, response, html) => {
    if(!error && response.statusCode ==200) {
     const $ = cheerio.load(html);
     dailyReflectionTitle = $('article.node.node--type-daily-reflection.node--view-mode-teaser-2 > h3').text();
     dailyReflectionP1 = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:first-child').text();
     dailyReflectionPageNumber = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:nth-child(2)').text();
     dailyReflectionP2 = $('.clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item > p:last-child').text();
    } else {
        console.log(error);
    }
});

app.post('/api/soberdate', (req, res) => {
  //Only display sobriety date for specific user
  console.log(req.body.id)
  SoberDate.find({ id: req.body.id })
  .then(soberDate => {
    console.log(soberDate)
    res.json({ soberDate, dailyReflectionTitle, dailyReflectionP1, dailyReflectionPageNumber, dailyReflectionP2 })
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({ msg: 'Error finding Sobriety date' })
  })
});

app.post('/api/inventory', (req, res) => {
    console.log(req.body);
    Inventory.find({ id: req.body.id })
    .then(inventory => {
      console.log(inventory);
      res.json({ inventory });
    }).catch(err => {
      console.log(err);
      res.status(400).json({ msg: 'Error finding Inventories', err: true });
    })
});

const Review = require('./models/reviews');

app.post('/api/reviews', (req, res) => {
  console.log(req.body.id);
  Review.find({ id: req.body.id })
  .then(review => {
    res.json({ review });
  }).catch(err => {
    console.log(err);
    res.status(400).json({ msg: 'Error getting review from database', err: true });
  })
});

//Bring in Inventory model
//const Inventory = require('./models/inventory');

app.post('/api/inventory/new', (req, res) => {
  console.log(req.body);
  const { user, formData, isChecked } = req.body;
  let newInventory = new Inventory({
    id: user.id,
    who: formData.who,
    why: formData.why,
    fear: isChecked[0].checked && isChecked[0].type,
    selfEsteem: isChecked[1].checked && isChecked[1].type,
    security: isChecked[2].checked && isChecked[2].type,
    personalRelationship: isChecked[3].checked && isChecked[3].type,
    sexRelations: isChecked[4].checked && isChecked[4].type,
    pride: isChecked[5].checked && isChecked[5].type,
    myPart: formData.myPart
  });
  newInventory.save()
  .then(inventory => {
    console.log(inventory);
    res.json(inventory);
  }).catch(err => {
    console.log(err);
    res.status(400).json({ msg: 'Error saving Inventory', err: true });
  });
});

app.get('/api/inventory/:id', (req, res) => {
    console.log(req.params);
    Inventory.findById(req.params.id)
    .then(inventory => {
      console.log(inventory)
      res.json(inventory);
    }).catch(err => {
      res.status(400).json({ msg: 'Error finding inventory', err: true });
    })
})

app.put('/api/inventory/:id', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { formData, isChecked } = req.body;
  Inventory.findByIdAndUpdate({ _id: req.params.id }, {
        who: formData.who,
        why: formData.why,
        fear: isChecked[0].checked && isChecked[0].type,
        selfEsteem: isChecked[1].checked && isChecked[1].type,
        security: isChecked[2].checked && isChecked[2].type,
        personalRelationship: isChecked[3].checked && isChecked[3].type,
        sexRelations: isChecked[4].checked && isChecked[4].type,
        pride: isChecked[5].checked && isChecked[5].type,
        myPart: formData.myPart
  })
  .then(inventory => {
    console.log(inventory, 'yoooooooo');
    res.json({ inventory })
  }).catch(err => {
    console.log(err);
    res.status(404).json({ msg: 'Error updating Inventory', err: true });
  })
});

app.get('/test', (req, res) => {
    //res.json({msg: "This works!"});
    res.redirect('http://localhost:3000/login');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));