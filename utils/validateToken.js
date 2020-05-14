const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/dbConfig");

module.exports = (token, secret = SECRET) => {
  if (token) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  } else {
    return undefined;
  }
};
