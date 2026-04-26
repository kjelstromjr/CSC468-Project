const usersController = require("../controllers/users");

const express = require('express');
const router = express.Router()

router.get("/all", usersController.getAll);
router.get("/get", usersController.getUser);
router.post("/add", usersController.addUser);
router.delete("/delete", usersController.deleteUser);

module.exports = router