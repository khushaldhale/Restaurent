const express = require("express");
const { authentication, isUser } = require("../middlewares/authentication");
const { createBucket, getAllBuckets, updateBucket, deleteBucket } = require("../controllers/bucket");
const router = express.Router();



router.post("/", authentication, isUser, createBucket);
router.get("/", authentication, isUser, getAllBuckets);
router.put("/", authentication, isUser, updateBucket);
router.delete("/", authentication, isUser, deleteBucket);




module.exports = router; 