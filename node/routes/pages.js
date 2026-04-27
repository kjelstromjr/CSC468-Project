let authController = require("../controllers/auth");

const express = require('express');
const router = express.Router();
const path = require('path');

const views = path.join(__dirname, "../views/");

router.get("/", authController.userAuth, (req, res) => {
    res.sendFile(views + "index.html");
});

router.get("/login", (req, res) => {
    res.sendFile(views + "login.html");
});

router.get("/admin", authController.adminAuth, (req, res) => {
    res.sendFile(views + "admin.html");
})

module.exports = router