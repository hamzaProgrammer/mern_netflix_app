const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        type : {
            type: String,
        },
        genre: {
            type: String,
        },
        content: {
            type: Array,
        },
    },
    {
        timestampse: true
    }
);


const Lists = mongoose.model('LISTS', ListSchema);

module.exports = Lists;