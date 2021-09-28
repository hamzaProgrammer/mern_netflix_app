const express = require('express')
const router = express.Router();
const {
    getAdminInfoCheck,
    addNewAdmin,
    getAllAdmins,
    updateAdmin,
    SignInAdmin,
    deleteAdmin
} = require('../controllers/AdminController')
const middleware = require('../middleware/UserMiddleware')

// for checking User Info
router.get('/adminCheck/:type/:data', middleware ,  getAdminInfoCheck)


// Deleting Admin
router.delete('/admin/:id' , middleware , deleteAdmin)

// For Registering Admin
router.post('/admin/addAdmin', middleware ,  addNewAdmin)


// Getting ALl Admins
router.get('/admin/allAdmins' ,middleware ,  getAllAdmins)


// UPdating Admin info
router.put('/adminUpdate/:id', middleware , updateAdmin)


// Signing In
router.post('/admin/LogIn' , SignInAdmin)

module.exports = router;