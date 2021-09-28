const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const auth = async (req, res , next ) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, JWT_SECRET_KEY)
            req.userId = decodedData

            next();
        }else{
            res.json({message: "Sorry! You are nor Autheticated"})
        }


    } catch (error) {
        console.log(`error in middleware ` ,error )
    }
}

module.exports = auth;