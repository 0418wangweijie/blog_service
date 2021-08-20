"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SlideShowSchema = new Schema({
    name: { type: String },
    files_url: { type: String },
    article_id: { type: String },
    sort: { type: Number },
  });
  return mongoose.model("SlideShow", SlideShowSchema, "slide_show");
};
