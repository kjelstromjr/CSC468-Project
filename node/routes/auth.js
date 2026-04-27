const authController = require("../controllers/auth");

const express = require('express');
const router = express.Router()

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/my-data", authController.myData);

module.exports = router