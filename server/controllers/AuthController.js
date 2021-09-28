const Users = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


// siging UP
const addUser = async (req,res) => {
    const { email , password , username , profilePic } = req.body;

    /* if (!username || !username || !password || !profilePic ) {
        return res.json({ message: "Please Fill All Required Fields" , status: 404 })
    } */

    const isUserExists = await Users.findOne({email});
    if(isUserExists){
        return res.json({ message: "User Already Exists" , status: 404 })
    }


    const hashedPassword = await bcrypt.hash(password, 12); // hashing password

    const newUser = new Users({username , email , password: hashedPassword , profilePic})

    try {
        await newUser.save();

        return res.json({ newUser  , status: 200 })
    } catch (error) {
        console.log("error in controller and error is : ", error)
        return res.json({message: 'Opps! Some Error Occured, Please Try Again.' , status: 500})
    }
}

// Siging In
const  SignIn = async (req , res) => {
    const { email  , password } = req.body;

    if (!email || !password ) {
        res.json({
            message: "Please Fill All Requited Fields",
            status: 404
        })
    }
    try {
        const isUserExists = await Users.findOne({email});
            if(!isUserExists){
                return res.json({ message: "User Not Found!!!" , status: 404})
            }

            const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password); // comparing password
            if (!isPasswordCorrect) {
                return res.json({
                    message: 'Invalid Credientials',
                    status: 401
                })
            }

            const token = jwt.sign({id: isUserExists._id , isAdmin: isUserExists.isAdmin} , JWT_SECRET_KEY , {expiresIn: '5d'}); // gentating token

            res.json({
                result: isUserExists,
                token,
                status: 200
            });
    } catch (error) {
        console.log('Error in Controller and error is : ' , error)
        return res.json({
                    message: 'Opps! Some Error Occured, Please Try Again.',
                    status: 404
                })
    }

}


module.exports = {
    addUser,
    SignIn
}