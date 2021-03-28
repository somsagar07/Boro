const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: {
        type: String,
        required: false 
    },
    query: {
        type: String,
        required: false 
    },
    lattitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false
    }
});

const postModel = mongoose.model('postModel', postSchema);
module.exports = postModel;