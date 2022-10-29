const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxTime = 24 * 60 * 60;

const createToken = (id, name) => {
    return jwt.sign({id: id , name: name}, process.env.JWT_SECRET, {expiresIn: '1d'});
} 

module.exports = createToken;