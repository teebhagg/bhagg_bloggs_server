const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/user')
require('dotenv').config();


const protect = asyncHandler(async(req, res, next) => {
    if(req.headers.cookie && req.headers.cookie.startsWith('token')){
        try {
            //Get Token from headers
            const cookieToken = req.headers.cookie.split('=')[1];
            console.log(cookieToken);

            // Verify Token
            const decoded = jwt.verify(cookieToken,process.env.JWT_SECRET);

            //Get User from token
            req.user = await User.findById(decoded.id).select('-password');
            console.log(req.user)

            next()
        } catch (error) {
            console.log(error);
            throw new Error (error.message);
        }
    }
    if(!req.headers.cookie.startsWith('token')){
        throw new Error('not authorized, No token')
    }
})

module.exports = protect