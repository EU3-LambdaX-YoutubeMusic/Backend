const dotenv = require('dotenv');

dotenv.config();

let connectionUrl = 'mongodb://localhost:27017/youtube_music';
const testdburl = 'mongodb://localhost:27017/youtube_music_test';

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.MONGO_URL;
}


module.exports = { connectionUrl, testdburl };