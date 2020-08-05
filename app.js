const express = require("express");
const path = require("path");
const app = express();
const compression = require("compression");

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
