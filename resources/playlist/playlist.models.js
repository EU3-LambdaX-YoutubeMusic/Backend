const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = Schema({
  user_id: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
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
    type: String,
    minlength: 5,
    maxlength: 80,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
