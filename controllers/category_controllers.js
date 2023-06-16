const asyncHandler = require("express-async-handler");
const Category = require("../model/category");

// Get All Categories
const getCategories = asyncHandler(async (req, res) => {
  try {
    let categoryObj = Category.find().sort("asc");
    res.status(200).json(categoryObj);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// write a function to export getCategories function
module.exports = getCategories;
