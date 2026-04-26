const employeesController = require("../controllers/employees");

const express = require('express');
const router = express.Router()

router.get("/all", employeesController.getAll);
router.get("/get", employeesController.getEmployee);
router.post("/add", employeesController.addEmployee);
router.delete("/delete", employeesController.deleteEmployee);

module.exports = router