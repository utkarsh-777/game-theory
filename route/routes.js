const express = require("express");

const router = express.Router();

let how_to_play_heap = [
  "This Is Two-Player Game Both Player Will Play Alternatively",
  "There Will Be Four Numbers Given You Has To Choose One",
  "The Chosen Number Of Stones Will Be Reduced From The Total Tiles",
  "You Cannot Remove More Tiles Than Available tiles",
  "The Player Who Cannot Play Its Turn Will Lose The Game",
  "5 Hints Are Given To Both Players To Help Them Guessing The Move",
];

let how_to_play_grid = [
  "This Is Two-Player Game Both Player Will Play Alternatively",
  "current position will be denoted by 'x'",
  "player can only move up or left",
  "player cannot cross obstacle (denoted by white color)",
  "2 bombs will be given to each player to break the obstacle",
  "player who cannot move will lose the game",
  "player who reaches the top left corner will win the game",
];

router
  .all("/", (req, res, next) => {
    res.render("home", {
      game_page: false,
      title: "Games",
    });
  })

  .all("/heap", (req, res, next) => {
    res.render("game", {
      img: "heap",
      link: "heap-vsPlayer",
      game_page: how_to_play_heap,
      title: "Heap Game",
    });
  })

  .all("/heap-vsPlayer", (req, res, next) => {
    res.render("heap_vsPlayer", {
      game_page: how_to_play_heap,
      title: "Heap Game",
    });
  })

  .all("/grid-vsPlayer", (req, res, next) => {
    res.render("grid_vsPlayer", {
      game_page: how_to_play_grid,
      title: "Grid Game",
    });
  })

  .all("/grid", (req, res, next) => {
    res.render("game", {
      img: "grid",
      link: "grid-vsPlayer",
      game_page: how_to_play_grid,
      title: "Grid Game",
    });
  });

module.exports = router;
