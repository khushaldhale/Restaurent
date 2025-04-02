const express = require("express");
const { authentication, isUser } = require("../middlewares/authentication");
const { createOrder } = require("../controllers/order");
const router = express.Router();


router.post("/create", authentication, isUser, createOrder);

//  updaion of order is remained yet 

module.exports = router