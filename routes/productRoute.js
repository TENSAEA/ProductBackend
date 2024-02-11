const express = require("express");
const router = express.Router();
const { productValidator } = require("../middleware/productValidator");
const { protectProduct } = require("../middleware/authMiddleware");
const { adminValidator } = require("../middleware/adminValidator");
const {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router
  .route("/")
  .get(protectProduct, getProducts)
  .post(protectProduct, productValidator, createProduct);
router
  .route("/:id")
  .put(protectProduct, productValidator, updateProduct)
  .delete(protectProduct, deleteProduct);

// for admin
router.get("/getAllProducts", protectProduct, adminValidator, getAllProducts);

module.exports = router;
