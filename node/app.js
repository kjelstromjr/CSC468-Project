const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const port = 8080;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));

app.get("/", (req, res) => {
    res.sendFile(path + "index.html");
})

app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});