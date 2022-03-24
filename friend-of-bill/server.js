const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
var cors = require('cors');
const passport = require('passport');

//Load messages model
const Message = require('./models/messages');

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
app.use('/', require('./routes/nightlyReviewsRoutes'));
app.use('/', require('./routes/messageRoutes'));


const PORT = process.env.PORT || 5000;

// Require socket.io and pass the server object to it
//Combine everything into one command
const io = require('socket.io')(
  app.listen(PORT, () => console.log(`App running on port ${PORT}`))
  , {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`Server connected: ${socket.id}`);

    socket.on('send_message', (data) => {
      let newMessage = new Message({
        message: data.message,
        user: data.user,
        img: data.profilePic
      });
      newMessage.save();
      io.emit('receive_message', data);
    })

  //   socket.on('newMessage', message => {
  //     console.log(message);
  //     io.emit('newMessage', message);
  // });

  //   //Listen for disconnect
  //   socket.on('disconnect', () => console.log(`Server disconnect: ${socket.id}`));
  });