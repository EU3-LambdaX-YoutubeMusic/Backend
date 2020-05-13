const express = require("express");

const mainRouter = express.Router();

const users = require("./users/users.routes");
const playlist = require("./playlist/playlist.routes");

mainRouter.use("/api/v1/users", users);
mainRouter.use("/api/v1/playlist", playlist);

module.exports = mainRouter;
