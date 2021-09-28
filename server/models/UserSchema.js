const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        profilePic : {
            type: String,
            default: ''
        }/* ,
        isAdmin: {
            type: String,
            default: false
        }, */
    },
    {
        timestampse: true
    }
);


const Users = mongoose.model('USERS', UserSchema);

module.exports = Users;