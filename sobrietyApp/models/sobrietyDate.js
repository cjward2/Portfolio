const mongoose = require('mongoose');

const soberDateSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Date", soberDateSchema);