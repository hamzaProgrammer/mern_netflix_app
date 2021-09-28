const express = require('express')
const router = express.Router();
const {
    getSingleUser,
    getSingleUserDelete,
    getSingleUserInfo,
    getAllUsers,
    getUserStats,
    getUserInfoCheck,
    uploadNewUser,
    LogInUser
} = require('../controllers/UserController')
const middleware = require('../middleware/UserMiddleware')

// GET USER Email Exists
router.get('/getUsersInfo/:parameter/:data', middleware ,  getUserInfoCheck) // must add middleware here


// UPDATE
router.put('/:id' , middleware ,  getSingleUser)

// DELETE
router.delete('/users/:id', middleware ,  getSingleUserDelete)


// GET Single User
router.get('/find/:id', middleware ,  getSingleUserInfo) 


// GET ALL
router.get('/users', middleware ,  getAllUsers) // must add middleware


// GET USER STATS
router.get('/users/stats', middleware ,  getUserStats) // must add middleware here


// GET USER STATS
router.post('/users/addNewuser' ,  uploadNewUser) // must add middleware here


// Sign In User
router.post('/users/LogInUser' ,  LogInUser) // must add middleware here




module.exports = router;