const express = require("express");
const path = require("path");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

const routes = require("./route/routes.js");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));

app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use(limiter);
// Data sanitization against XSS
app.use(xss());

app.use(compression());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started at 3000");
});
