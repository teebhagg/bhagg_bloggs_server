const Post = require("../model/post");
const asyncHandler = require("express-async-handler");

// Get all Blog Post
const getAllPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5; // Number of items per page
    const skip = (page - 1) * limit; // Calculate the skip value

    const allBlogPost = await Post.find()
      .skip(skip)
      .limit(limit)
      .lean()
      .sort({ createdAt: -1 });
    res.status(200).json(allBlogPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get One Blog Post
const getOnePost = async (req, res) => {
  const { id } = req.params;
  try {
    const oneBlogPost = await Post.findOne({ _id: id });
    res.status(200).json(oneBlogPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Create Blog Post
const createBlogPost = async (req, res) => {
  const { title, content, author, email, category } = req.body;
  try {
    const newPost = await Post.create({
      title,
      content,
      author,
      email,
      category,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update Blog Post
const updateBlogPost = async (req, res) => {
  const { title, content, category } = req.body;
  const { id } = req.params;
  try {
    const updateBlogPost = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { title, content, category } }
    );
    res.status(200).json(updateBlogPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Delete Blog Post
const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBlogPost = await Post.findOneAndDelete({ _id: id });
    res.status(200).json(deleteBlogPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get Blog Post Like Count
const getLikeCount = asyncHandler( async(req, res)=>{
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post.likes.length);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

// Like or Unlike Blog Post
const likeOrUnlikeBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(like => like !== userId);
    } else {
      post.likes.push(userId);
    }

    // Exclude 'createdAt' field from the update operation
    await Post.updateOne({ _id: id }, { $set: { likes: post.likes } });

    res.status(200).json({ message: isLiked ? "Unliked" : "Liked" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});



module.exports = {
  getAllPosts,
  getOnePost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getLikeCount,
  likeOrUnlikeBlog,
};
