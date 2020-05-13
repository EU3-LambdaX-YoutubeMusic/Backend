const Playlist = require("./playlist.models");

const getAllMusic = async (req, res) => {
  try {
    Playlist.find({}).then(function (playlist) {
      // res.send(playlist);
      res.status(200).json({
        status: 200,
        playlist,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error,
    });
  }
};

module.exports = { getAllMusic };
