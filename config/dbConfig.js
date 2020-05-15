const dotenv = require('dotenv');

dotenv.config();

let connectionUrl = 'mongodb://localhost:27017/youtube_music';
const testdburl = process.env.TEST_URL;

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.MONGO_URL;
}


module.exports = { connectionUrl, testdburl };