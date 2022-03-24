const express = require('express');
const router = express.Router();

const Message = require('../models/messages');


router.get('/api/messages', (req, res) => {
    Message.find({})
    .then(messages => {
        res.json(messages);
    }).catch(() => {
        res.status(404).json({ msg: 'Something went wrong getting messages' });
    })
})

module.exports = router;