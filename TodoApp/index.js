const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
mongoose.set('useFindAndModify', false);

const dbConfig = require('./config');
let { authInfo, url, db } = dbConfig.person;
let connection = `${url}/${db}`
mongoose.connect(connection, authInfo)
.then(() => console.log('Connected to database!'))
.catch(err => console.log('error', err));

//Schema
const TodoSchema = mongoose.Schema({
    description: String,
    isComplete: Boolean
});

//Model
let TodoModel = mongoose.model('todo', TodoSchema);

//Read
app.get('/todos', (req, res) => {
    TodoModel.find({ }, (err, data) => {
    if(err) {
        console.log('Error finding data', err);
        res.status(404).send({ message: 'Mongo error', err: err });
    }
    console.log('Here is your data', data);
    res.json(data);
});  
});

//Create - post
app.post('/todos', (req, res) => {
    const newTodo = new TodoModel({
        description: req.body.description,
        isComplete: false
    });
    newTodo.save((err, data) => {
        console.log(data)
        if(err) {
            res.status(400).send({ message: 'error', err: err });
        }
        res.json(data);
    })
});

//Edit - PUT route
app.put('/todos/:id', (req, res) => {
    TodoModel.findByIdAndUpdate({ _id: req.params.id }, {
        isComplete: !req.body.isComplete
    }, (error, todo) => {
        console.log(todo);
        if(error) {
            console.log('Error in Put route', error)
        }
        console.log(todo);
        res.json(todo);
    });
});

//Delete Route
app.delete('/todos/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id, (err, todo) => {
        if(err) {
            console.log('Error deleting todo', err);
        } 
        res.json(todo);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App on port ${PORT}`));