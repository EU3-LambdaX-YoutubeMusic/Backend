const express = require("express");

const router = express.Router();

const playlistController = require("./playlistController");
const { validateToken } = require("../../utils/validateToken");

const { getAllMusic, addMusic, updateMusic } = playlistController;

router.get("/getAllMusic", validateToken, getAllMusic);
router.post("/addMusic", validateToken, addMusic);
router.put("/updateMusic", validateToken, updateMusic);

module.exports = router;
