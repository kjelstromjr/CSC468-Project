const employeeModel = require("../models/employees");

exports.getAll = async (req, res) => {
    res.json(await employeeModel.getAll());
    res.status(200).end();
}

exports.getEmployee = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        res.status(400).json({
            error: "Please provide an employee ID"
        });
    } else {
        let employee = await employeeModel.getEmployee(id);

        if (!employee) {
            res.status(404).json({
                error: "Employee not found"
            });
        }

        res.status(200).json(employee);
    }
}

exports.addEmployee = async (req, res) => {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let pay = req.body.pay;

    if (!firstName || !lastName || !pay) {
        res.status(400).json({
            error: "Please provide the required data: firstName, lastName, pay"
        });
    } else {
        let employeeId = await employeeModel.addEmployee(firstName, lastName, pay);

        if (employeeId < 0) {
            res.status(400).json({
                error: "An error occured"
            });
        } else {
            res.status(200).json({
                employee_id: employeeId
            });
        }
    }
}

exports.deleteEmployee = async (req, res) => {
    let id = req.body.id;

    if (!id) {
        res.status(400).json({
            error: "Please provide an employee ID"
        });
    } else {
        let result = await employeeModel.deleteEmployee(id);

        if (result < 0) {
            res.status(404).json({
                error: "There was an error deleting the employee. Please ensure the employee exists"
            });
        } else {
            res.status(200).json({
                status: "Employee deleted successfully"
            });
        }
    }
}