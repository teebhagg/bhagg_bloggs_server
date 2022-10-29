const createToken = require("../jwt/jwt");
const User = require("../model/user");
const asyncHandler = require('express-async-handler')

// Create User
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({ name, email, password });
    const token = createToken(newUser._id, newUser.name);
    res.header('Set-Cookie', 'token='+token)
    res.status(200).json({token});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Login User
const logUserIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await User.login(email, password)
    const token = createToken(userLogin._id, userLogin.name)
    res.setHeader('Set-Cookie','token='+token)
    res.status(200).json({token});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get User Account
const getUser = asyncHandler(async(req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
})

module.exports = {createUser, logUserIn, getUser}