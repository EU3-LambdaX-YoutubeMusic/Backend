const Playlist = require("./playlist.models");
var mongoose = require("mongoose");

const getAllMusic = async (req, res) => {
  try {
    const userId = req.userId;
    const { token } = req.headers;
    if (token) {
      await Playlist.find({
        user_id: { $in: [mongoose.Types.ObjectId(userId)] },
      }).then(function (playlist) {
        res.status(200).json({
          status: 200,
          playlist,
        });
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Login to see your playlist",
      });
    }
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
    const userId = req.userId;
    const { token } = req.headers;
    if (token) {
      const playlist = new Playlist({
        user_id: userId,
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
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error,
    });
  }
};

const updateMusic = async (req, res) => {
  try {
    const { artist, title, video_url, favourite, musicId } = req.body;
    // const userId = req.userId;
    const { token } = req.headers;

    // await updateProfile(subject, musicId);
    if (token && musicId) {
      const selectedMusic = await Playlist.findById(musicId);
      console.log(selectedMusic.video_url);
      selectedMusic.artist = artist;
      selectedMusic.title = title;
      selectedMusic.video_url = video_url;
      selectedMusic.favourite = favourite;
      await selectedMusic.save();

      res.status(200).json({
        message: "update successful",
      });
    } else {
      // console.log("Faiiiiiiiiiiiiiiioll");
      res.status(400).json({ message: `musicId not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating profile: ${error.message}` });
  }
};

const deleteMusic = async (req, res) => {
  try {
    const { musicId } = req.body;
    const { token } = req.headers;

    if (token && musicId) {
      // const selectedMusic =
      await Playlist.findById(musicId).deleteOne();

      res.status(200).json({ message: "music successfully deleted" });
    } else {
      // console.log("Faiiiiiiiiiiiiiiioll");
      res.status(400).json({ message: `musicId not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error deleting music: ${error.message}` });
  }
};

module.exports = { getAllMusic, addMusic, updateMusic, deleteMusic };
