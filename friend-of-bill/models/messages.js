const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Message", messagesSchema);