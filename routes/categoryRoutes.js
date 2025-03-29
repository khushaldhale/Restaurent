const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { getAllCategories, createCategory, deleteCategory, updateCategory } = require("../controllers/category");
const router = express.Router();




router.get("/", authentication, getAllCategories);
router.post("/", authentication, isAdmin, createCategory);
router.route("/:id").delete(authentication, isAdmin, deleteCategory).put(authentication, isAdmin, updateCategory);


module.exports = router