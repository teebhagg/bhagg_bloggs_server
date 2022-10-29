// Imports
const express = require("express");
const {
  getAllPosts,
  getOnePost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blog_controllers");
const {
  createUser,
  logUserIn,
  getUser,
} = require("../controllers/user_controller");
const protect = require("../middleWare/authMiddleWare");

// Middleware
const router = express.Router();

// Blogs Endpoints
router.get("/", getAllPosts);

router.get("/:id", getOnePost);

router.post("/", createBlogPost);

router.put("/:id", updateBlogPost);

router.delete("/:id", deleteBlogPost);

// Users EndPoint
router.post("/register", createUser);

router.post("/login", logUserIn);

router.get("/users/me", protect, getUser);

module.exports = router;
