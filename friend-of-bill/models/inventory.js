const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    who: {
        type: String,
        required: true
    },
    why: {
        type: String,
        required: true
    },
    fear: {
        type: String,
        required: false
    },
    selfEsteem: {
        type: String,
        required: false
    },
    security: {
        type: String,
        required: false
    },
    personalRelationship: {
        type: String,
        required: false
    },
    sexRelations: {
        type: String,
        required: false
    },
    pride: {
        type: String,
        required: false
    },
    myPart: {
        type: String,
        required: false
    }
});

module.exports =  mongoose.model("Inventory", inventorySchema);