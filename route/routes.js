const express = require("express");

const router = express.Router();

router
  .all("/", (req, res, next) => {
    res.render("home");
  })

  .all("/heap", (req, res, next) => {
    res.render("game", {
      img: "heap",
      link: "heap-vsPlayer",
    });
  })

  .all("/heap-vsPlayer", (req, res, next) => {
    res.render("heap_vsPlayer");
  })

  .all("/grid-vsPlayer", (req, res, next) => {
    res.render("grid_vsPlayer");
  })

  .all("/grid", (req, res, next) => {
    res.render("game", {
      img: "grid",
      link: "grid-vsPlayer",
    });
  });

module.exports = router;
