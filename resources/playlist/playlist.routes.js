const express = require("express");

const router = express.Router();

const playlistController = require("./playlistController");

const { getAllMusic } = playlistController;

router.get("/getAllMusic", getAllMusic);

module.exports = router;
