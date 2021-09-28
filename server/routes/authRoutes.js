const express = require('express')
const router = express.Router();
const {
    addUser,
    SignIn
} =  require('../controllers/AuthController')


// REGISTER
router.post('/register', addUser);

// SIGN In
router.post('/signin', SignIn);


module.exports = router;