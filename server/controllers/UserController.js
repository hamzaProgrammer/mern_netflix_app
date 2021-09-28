const Users = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// Updating User Account
const getSingleUser = async (req ,res) => {
    const { id } = req.params;
    const { password } = req.body

    if (req.userId === id || req.isAdmin){

        if(password){
            password = await bcrypt.hash(password, 12); // hashing password
        }

        try {
            const updatedUser = await Users.findByIdAndUpdate(id ,{ $set: req.body } , {new: true} )

            res.status(201).json({updatedUser})
        } catch (error) {
            console.log("Error in getSingleRecord and error is : ", error)
        }
    }else{
        res.status(403).json({message: "You Are Not Allowed to Update Your Account" })
    }

}

// Deleteing User Account
const getSingleUserDelete = async (req ,res) => {
    const { id } = req.params;

    if (req.userId === id || req.isAdmin){

        try {
            const deletedUser = await Users.findByIdAndDelete(id)

            res.status(201).json({message: "User has been DELETED"})
        } catch (error) {
            console.log("Error in getSingleUserDelete and error is : ", error)
        }
    }else{
        res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    }

}

// Getting Single  User Account
const getSingleUserInfo = async (req ,res) => {
    const { id } = req.params;

    if (req.userId === id || req.isAdmin){

        try {
            const gotUser = await Users.findById(id , {password: 0})

            res.status(201).json({gotUser})
        } catch (error) {
            console.log("Error in getSingleUserInfo and error is : ", error)
        }
    }else{
        res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    }

}

// Getting All Users
const getAllUsers = async (req, res) => {
    const query = req.query.new;


    //if (req.isAdmin){

        try {
            const allUsers = query ?  await Users.find().limit(5) : await Users.find();

            res.status(201).json({allUsers})
        } catch (error) {
            console.log("Error in getAllUsers and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to See All Users" })
    //}

}

// Getting Stats
const getUserStats = async (req,res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() -1);

    try {
        const data = await Users.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json("Error in getUserStats and error is : " ,error)
    }
}

// Deleteing User Account
const getUserInfoCheck = async (req, res) => {
    const { parameter , data } = req.params;

    if(parameter === "email"){
        try {
            const isEmail = await Users.findOne({email : data})

            if(isEmail !== null){
                res.status(201).json({message: "*** This Email is Already Taken ***"})
            }else{
                res.status(201).json({message: null })
            }
        } catch (error) {
            console.log("Error in getSingleUserDelete and error is : ", error)
        }
    }else{
        try {
            const isUserName = await Users.findOne({username : data})

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

// Upload New user
const uploadNewUser = async (req, res) => {
    const { password , username , email , profilePic } = req.body

    const hashedPassword = await bcrypt.hash(password, 10); // hashing password

    const newUser = new Users({username , email , password: hashedPassword , profilePic})

    try {
        await newUser.save();

        res.status(201).json({AddedUser})
        } catch (error) {
            console.log("Error in uploadNewUser and error is : ", error)
        }

}

// Updating User Account
const LogInUser = async (req, res) => {
    const { email ,  password } = req.body

        try {
            const isUserExists = await Users.findOne({email});

            if(!isUserExists){
                return res.json({ message: "User Not Found!!!"})
            }

            const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password); // comparing password
            if (!isPasswordCorrect) {
                return res.json({
                    message: 'Invalid Credientials'
                })
            }


            res.json({
                myResult: isUserExists,
            });
        } catch (error) {
            console.log("Error in getSingleRecord and error is : ", error)
        }

}

module.exports = {
    getSingleUser,
    getSingleUserDelete,
    getSingleUserInfo,
    getAllUsers,
    getUserStats,
    getUserInfoCheck,
    uploadNewUser,
    LogInUser
}