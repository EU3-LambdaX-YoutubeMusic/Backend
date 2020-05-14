const Playlist = require("./playlist.models");
const AuthHelper = require("../users/auth");

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

const addMusic = async (req, res) => {
  try {
    const { artist, title, video_url, favourite } = req.body;
    // const existingUser = await Playlist.findOne({ user_id });
    const { token } = req.headers;
    if (token) {
      const playlist = new Playlist({
        artist,
        title,
        video_url,
        favourite,
      });
      await playlist.save();

      return res.status(201).json({
        status: 201,
        message: "Playlist created successfully",
        playlist: playlist,
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Login to add music",
      });
    }

    // });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error,
    });
  }
};

module.exports = { getAllMusic, addMusic };
