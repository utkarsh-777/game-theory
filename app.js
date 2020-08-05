const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");
const app = express();

const routes = require("./route/routes.js");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));

app.use(express.static(path.join(__dirname, "public")));

app.use(compression());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started at 3000");
});
