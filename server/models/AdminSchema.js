const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        adminPhoto : {
            type: String,
            default: ''
        }
    },
    {
        timestampse: true
    }
);


const Admin = mongoose.model('ADMIN', AdminSchema);

module.exports = Admin;