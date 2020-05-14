const mongoose = require("mongoose");

const { Schema } = mongoose;
const PlaylistSchema = Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  artist: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  video_url: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 80,
    unique: true,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);
module.exports = PlaylistModel;
