"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;

  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    introduce: {
      type: String,
    },
    typeId: {
      type: String,
    },
    createTime: {
      type: Number,
      default: Date.now,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
  });

  return mongoose.model("Article", ArticleSchema, "article");
};
