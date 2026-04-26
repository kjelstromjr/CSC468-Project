const hoursModel = require("../models/hours");

exports.getHours = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        res.status(400).json({
            error: "Please provide a employee ID"
        });
    } else {
        let hours = await hoursModel.getHours(id);

        res.status(200).json(hours);
    }
}

exports.addHours = async (req, res) => {
    let employee_id = req.body.employee_id;
    let date = req.body.date;
    let amount = req.body.amount;

    if (!employee_id || !date || !amount) {
        res.status(400).json({
            error: "Please provide the required data: employee_id, date, amount"
        });
    } else {

        let result = await hoursModel.addHours(employee_id, date, amount);

        if (result < 0) {
            res.status(400).json({
                error: "An error occured. Please ensure that the employee id exists"
            });
        } else {
            res.status(200).json({
                status: "Hours added"
            });
        }
    }
}