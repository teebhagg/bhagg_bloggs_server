const createToken = require("../jwt/jwt");
const User = require("../model/user");
const asyncHandler = require('express-async-handler');
const Post = require("../model/post");

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

// Get User Blogs
const getUserBlogs = asyncHandler(async(req, res) => {
  const { email } = req.params;
  try {
    const allUserBlogs = await Post.find({email: email})
    res.status(200).json(allUserBlogs);
  } catch (error) {
    res.status(404).json({error: error.message})
  }
})

module.exports = {createUser, logUserIn, getUser, getUserBlogs} 