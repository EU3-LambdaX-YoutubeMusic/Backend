const express = require("express");

const router = express.Router();

const playlistController = require("./playlistController");

const { getAllMusic, addMusic } = playlistController;

router.get("/getAllMusic", getAllMusic);
router.post("/addMusic", addMusic);

module.exports = router;
