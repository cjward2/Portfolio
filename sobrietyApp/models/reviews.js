const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    q1: {
        type: String,
        required: true
    },
    describe1: {
        type: String,
        required: false
    },
    q2: {
        type: String,
        required: true
    },
    describe2: {
        type: String,
        required: false
    },
    q3: {
        type: String,
        required: true
    },
    describe3: {
        type: String,
        required: false
    },
    q4: {
        type: String,
        required: true
    },
    describe4: {
        type: String,
        required: false
    },
    q5: {
        type: String,
        required: true
    },
    describe5: {
        type: String,
        required: false
    },
    q6: {
        type: String,
        required: true
    },
    describe6: {
        type: String,
        required: false
    },
    q7: {
        type: String,
        required: true
    },
    describe7: {
        type: String,
        required: false
    },
    describe8: {
        type: String,
        required: false
    },
    q9: {
        type: String,
        required: true
    },
    describe9: {
        type: String,
        required: false
    },
    q10: {
        type: String,
        required: true
    },
    describe10: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }

});

module.exports = mongoose.model("Review", reviewSchema);