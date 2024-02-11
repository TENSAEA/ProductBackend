const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel"); // Changed from Todo to Product
const User = require("../model/userModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(); // Changed from todos to products
  res.status(200).json(products);
});

const getProducts = async (req, res) => {
  const products = await Product.find({ user: req.user.id }); // Changed from todos to products
  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const product = await Product.create({
    // Changed from todos to product
    user: req.user.id,
    name: req.body.name, // Assuming title is changed to name
    description: req.body.description,
  });

  res.status(200).json(product); // Changed from todos to product
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id); // Changed from todo to product
  if (!product) {
    res.status(400).json({ error: "Product not found" }); // Changed message from todo to product
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
  }

  if (product.user.toString() !== user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      // Changed from todo to product
      new: true,
    }
  );
  res.status(200).json({ updatedProduct });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id); // Changed from todo to product
  if (!product) {
    res.status(400).json({ error: "Product not found" }); // Changed message from todo to product
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
  }

  if (product.user.toString() !== user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  await Product.findByIdAndRemove(req.params.id); // Changed from todo to product

  res.status(200).json({ message: "Deleted successfully" });
};

module.exports = {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
