const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/dbConfig");

exports.validateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, SECRET);

    const userId = await decodedToken.id;
    // const response = await model.confirmEmail(userId);

    if (userId) {
      req.userId = decodedToken.id;
      next();
    } else {
      res.status(400).json({ message: `userId not found` });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: `error validating user token: ${error.message}!` });
  }
};
