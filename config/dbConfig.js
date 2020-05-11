const dotenv = require('dotenv');

dotenv.config();

let connectionUrl = 'mongodb://localhost:27017/youtube_music';

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.MONGO_URL;
}


module.exports = { connectionUrl };