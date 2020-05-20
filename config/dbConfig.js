const dotenv = require("dotenv");

dotenv.config();

let connectionUrl = "mongodb://localhost:27017/youtube_music";

if (process.env.NODE_ENV === "production") {
  connectionUrl = process.env.MONGO_URL;
}

const port = process.env.PORT || 4003;
const SECRET = process.env.SECRET_KEY || "A very secure secret";

module.exports = { connectionUrl, port, SECRET };
