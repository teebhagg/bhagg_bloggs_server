const Post = require("../model/post");

// Get all Blog Post
const getAllPosts = async(req, res)=>{
    try {
        const allBlogPost = await Post.find()
        res.status(200).json(allBlogPost)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// Get One Blog Post
const getOnePost = async(req, res)=>{
    const {id} = req.params;
    try {
        const oneBlogPost = await Post.findOne({_id:id});
        res.status(200).json(oneBlogPost);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// Create Blog Post
const createBlogPost = async(req, res)=>{
    const {title, content, author, email} = req.body;
    try {
        const newPost = await Post.create({title, content, author, email});
        res.status(200).json(newPost);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// Update Blog Post
const updateBlogPost = async(req, res)=>{
    const {title, content} = req.body;
    const {id} = req.params
    try {
        const updateBlogPost = await Post.findOneAndUpdate({_id:id}, {$set:{title, content}});
        res.status(200).json(updateBlogPost);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// Delete Blog Post
const deleteBlogPost = async(req, res)=>{
    const {id} = req.params;
    try {
        const deleteBlogPost = await Post.findOneAndDelete({_id:id});
        res.status(200).json(deleteBlogPost);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = { getAllPosts, getOnePost, createBlogPost, updateBlogPost, deleteBlogPost};