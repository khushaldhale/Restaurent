const express = require("express");
const { authentication, isUser } = require("../middlewares/authentication");
const { createBucket } = require("../controllers/bucket");
const router = express.Router();



router.post("/", authentication, isUser, createBucket);

module.exports = router; 