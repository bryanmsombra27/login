const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

app.use(helmet());
app.use(xss());
app.use(cors());
app.options("*", cors());
app.use(mongoSanitize());
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//LIMIT REQUEST
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, //intentar de nuevo en una hora
    message: "Demasiadas peticiones realizadas, intenta mas tarde",
});

app.use("/blogs", userRoutes);

module.exports = app;