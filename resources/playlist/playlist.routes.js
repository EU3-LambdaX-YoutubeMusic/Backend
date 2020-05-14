const express = require("express");

const router = express.Router();

const playlistController = require("./playlistController");
const { validateToken } = require("./middlewares");

const { getAllMusic, addMusic } = playlistController;

router.get("/getAllMusic", getAllMusic);
router.post("/addMusic", validateToken, addMusic);

module.exports = router;
