const express = require("express");
const { protect, protectProduct } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controllers/userController");

router.post("/", register);
router.post("/login", login);
router.get("/profile", protectProduct, getProfile); // This line should be checked

module.exports = router;
