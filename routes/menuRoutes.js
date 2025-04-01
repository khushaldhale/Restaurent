const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createMenu, deleteMenu, getAllMenus, getParticularMenu, updateMenu } = require("../controllers/menus");
const router = express.Router();


router.post("/:id/menus", authentication, isAdmin, createMenu);
router.delete("/:id/menus/:menuid", authentication, isAdmin, deleteMenu);
router.get("/:id/menus", authentication, isAdmin, getAllMenus);
router.get("/:id/menus/:menuid", authentication, isAdmin, getParticularMenu);
router.put("/:id/menus/:menuid", authentication, isAdmin, updateMenu);

module.exports = router