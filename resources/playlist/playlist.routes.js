const express = require("express");

const router = express.Router();

const playlistController = require("./playlistController");
const { validateToken } = require("../../utils/validateToken");

const { getAllMusic, addMusic, updateMusic, deleteMusic } = playlistController;

router.get("/getAllMusic", validateToken, getAllMusic);
router.post("/addMusic", validateToken, addMusic);
router.put("/updateMusic", validateToken, updateMusic);
router.delete("/deleteMusic", validateToken, deleteMusic);

module.exports = router;
