const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createMenu, deleteMenu } = require("../controllers/menus");
const router = express.Router();



router.post("/:id/menus", authentication, isAdmin, createMenu);
router.delete("/:id/menus/:menuid", authentication, isAdmin, deleteMenu);



module.exports = router