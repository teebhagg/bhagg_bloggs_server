const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/user')
require('dotenv').config();


const protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get Token from headers
            token = req.headers.authorization.split(' ')[1];
            console.log(token);

            // Verify Token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            //Get User from token
            req.user = await User.findById(decoded.id).select('-password');
            console.log(req.user)

            next()
        } catch (error) {
            console.log(error);
            throw new Error (error.message);
        }
    }
    if(token){
        throw new Error('not authorized, No token')
    }
})

module.exports = protect 