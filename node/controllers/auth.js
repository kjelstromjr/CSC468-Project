const userModel = require("../models/users");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "dev_secret";

exports.userAuth = async (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        
        if (decoded.role > 0) {
            return res.redirect("/admin");
        } else {
            req.user = decoded;
            next();
        }
    } catch (err) {
        return res.redirect("/login");
    }
}

exports.adminAuth = async (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, SECRET);

        if (decoded.role > 0) {
            req.user = decoded;
            next();
        } else {
            return res.redirect("/");
        }
    } catch (err) {
        return res.redirect("/login");
    }
}

exports.login = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(400).json({
            error: "Please provide a username and password"
        });
    } else {
        let result = await userModel.checkUser(username, password);

        if (!result) {
            res.status(403).json({
                error: "Username or password incorrect"
            });
        } else {
            const token = jwt.sign(
                {
                    id: result.id,
                    username: result.username,
                    role: result.role,
                    employee_id: result.employee_id
                },
                SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            });

            res.status(200).json({
                status: "Success"
            });
        }
    }
}

exports.logout = (req, res) => {
  res.clearCookie("auth_token");
  res.json({ success: true });
}

exports.myData = (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        res.status(404).json({
            error: "No login session curretly stored"
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET);

        res.status(200).json(decoded);
    } catch (err) {
        res.status(403).json({
            error: "There is something wrong with the login session. Please try logging in a again"
        })
    }
}