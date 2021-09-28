const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        desc : {
            type: String,
        },
        img: {
            type: String
        },
        imgTitle : {
            type: String
        },
        imgSm: {
            type: String
        },
        trailor: {
            type: String
        },
        video: {
            type: String
        },
        year: {
            type: String
        },
        limit : {
            type: Number
        },
        genre: {
            type: String
        },
        isSeries: {
            type: String,
        },
        duration: {
            type: String
        }
    },
    {
        timestampse: true
    }
);


const Movies = mongoose.model('MOVIES', MoviesSchema);

module.exports = Movies;