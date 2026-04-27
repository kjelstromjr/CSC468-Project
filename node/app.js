const userRoutes = require("./routes/users");
const employeeRoutes = require("./routes/employees");
const hoursRoutes = require("./routes/hours");
const pagesRoutes = require("./routes/pages");
const authRoutes = require("./routes/auth");

const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();
const router = express.Router();

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(cookieParser());

app.use("/users/", userRoutes);
app.use("/employees/", employeeRoutes);
app.use("/hours/", hoursRoutes);
app.use("/auth/", authRoutes);
app.use("/", pagesRoutes);

app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});