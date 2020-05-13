const express = require('express');

const mainRouter = express.Router();

const users = require('./users/users.routes');

mainRouter.use('/api/v1/users', users);

module.exports = mainRouter;