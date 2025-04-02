const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createEmployee, deleteEmployee, updateEmployee, getAllEmployees, filteredEmployee } = require("../controllers/employee");
const router = express.Router();



router.post("/", authentication, isAdmin, createEmployee);
router.delete("/:id", authentication, isAdmin, deleteEmployee);
router.put("/:id", authentication, isAdmin, updateEmployee);
router.get("/", authentication, isAdmin, getAllEmployees);
router.get("/", authentication, isAdmin, filteredEmployee);



module.exports = router;

