const hoursController = require("../controllers/hours");

const express = require('express');
const router = express.Router()

router.get("/get", hoursController.getHours);
router.post("/add", hoursController.addHours);

module.exports = router