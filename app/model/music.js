"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MusicSchema = new Schema({
    name: { type: String },
    artist: { type: String },
    url: { type: String },
    cover: { type: String },
  });

  return mongoose.model("Music", MusicSchema, "music");
};
