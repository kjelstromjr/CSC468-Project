const usersModel = require("../models/users");

exports.getAll = async (req, res) => {
    res.json(await usersModel.getAll());
    res.status(200).end();
}

exports.getUser = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        res.status(400).json({
            error: "Please provide a user ID"
        });
    } else {
        let user = await usersModel.getUser(id);

        if (!user) {
            res.status(404).json({
                error: "User not found"
            });
        }

        res.status(200).json(user);
    }
}

exports.addUser = async (req, res) => {
    let employee_id = req.body.employee_id;
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    if (!employee_id || !username || !password) {
        res.status(400).json({
            error: "Please provide the required data: employee_id, username, password"
        });
    } else {
        if (!role) {
            role = 0;
        }

        let userId = await usersModel.addUser(employee_id, username, password, role);

        if (userId < 0) {
            res.status(400).json({
                error: "Please ensure that the employee_id is connected to an employee and that both employee_id and username are unique"
            });
        } else {
            res.status(200).json({
                user_id: userId
            });
        }
    }
}

exports.deleteUser = async (req, res) => {
    let id = req.body.id;

    if (!id) {
        res.status(400).json({
            error: "Please provide a user ID"
        });
    } else {
        let result = await usersModel.deleteUser(id);

        if (result < 0) {
            res.status(404).json({
                error: "There was an error deleting the user. Please ensure the user exists"
            });
        } else {
            res.status(200).json({
                status: "User deleted successfully"
            });
        }
    }
}