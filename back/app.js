const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config()

const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const comRoutes = require("./routes/comRoutes")

const app = express()

app.use((req, res, next) => {
    req.locals = {};
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.use("/images", express.static(path.join(__dirname, "images")))

app.use("/api/auth", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/com", comRoutes)

module.exports = app