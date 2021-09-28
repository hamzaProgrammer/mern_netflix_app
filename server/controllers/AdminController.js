const Admin = require('../models/AdminSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// Checking Admin Account
const getAdminInfoCheck = async (req, res) => {
    const { type , data } = req.params;

    if(type === "email"){
        try {
            const isEmail = await Admin.findOne({email : data})

            if(isEmail !== null){
                res.status(201).json({message: "*** This Email is Already Taken ***"})
            }else{
                res.status(201).json({message: null })
            }
        } catch (error) {
            console.log("Error in getAdminInfoCheck and error is : ", error)
        }
    }else{
        try {
            const isUserName = await Admin.findOne({username : data})

            if (isUserName !== null) {
                res.status(201).json({message: "*** This UserName is Already Taken ***"})
            }else{
                res.status(201).json({message: null })
            }
        } catch (error) {
            console.log("Error in getSingleUserDelete and error is : ", error)
        }
    }

}


// Upload New Admin User
const addNewAdmin = async (req, res) => {
    const { password , username , email , adminPhoto } = req.body

    const hashedPassword = await bcrypt.hash(password, 10); // hashing password

    const newAdmin = new Admin({username , email , password: hashedPassword , adminPhoto})

    try {
        await newAdmin.save();

        res.status(201).json({newAdmin})
        } catch (error) {
            console.log("Error in uploadNewUser and error is : ", error)
        }

}

// Getting All Users
const getAllAdmins = async (req, res) => {

    //if (req.isAdmin){

    try {
        const allAdmins =  await Admin.find()

        res.status(201).json({
            allAdmins
        })
    } catch (error) {
        console.log("Error in getallAdmins and error is : ", error)
    }
    //}else{
    //res.status(403).json({message: "You Are Not Allowed to See All Users" })
    //}

}

// Updating Admin Info
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { email , username , } = req.body

    if (req.userId){
        try {
            const checkInfo = await Admin.find({ $or: [ { email: email }, { username: username } ] }).count()
            if(checkInfo > 1){
                res.status(201).json({message: "*** Email or UserName Already Taken *** "})
            }else{
                const updatedAdmin = await Admin.findByIdAndUpdate(id ,{ $set: req.body } , {new: true} )

                res.status(201).json({updatedAdmin , message: ''})
            }
        } catch (error) {
            console.log("Error in updateAdmin and error is : ", error)
        }
    }else{
        res.status(403).json({message: "You Are Not Allowed to Update Admin!!!" })
    }

}


// Updating User Account
const SignInAdmin = async (req, res) => {
    const { email ,  password } = req.body

        try {
            const isUserExists = await Admin.findOne({email});

            if(isUserExists === null){
                return res.json({ message: " *** User Not Found ***"})
            }

            const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password); // comparing password
            if (!isPasswordCorrect) {
                return res.json({
                    message: '*** Invalid Credientials ***'
                })
            }

            const token = jwt.sign({id: isUserExists._id} , JWT_SECRET_KEY , {expiresIn: '5d'}); // gentating token

            res.json({
                myResult: isUserExists,
                token : token,
                message: ''
            });
        } catch (error) {
            console.log("Error in SignInAdmin and error is : ", error)
        }

}


// Deleteing Movie
const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    if (req.userId){

        try {
            await Admin.findByIdAndDelete(id)

            res.status(201).json({message: "Admin has been DELETED"})
        } catch (error) {
            console.log("Error in deleteAdmin and error is : ", error)
        }
    }else{
        res.status(404).json({message: "You Are Not Allowed to Delete Your Admin" })
    }

}

module.exports = {
    getAdminInfoCheck,
    addNewAdmin,
    getAllAdmins,
    updateAdmin,
    SignInAdmin,
    deleteAdmin
}