"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const StatisticSchema = new Schema({
    name: { type: String },
    value: { type: String },
    year: { type: Number },
  });

  return mongoose.model("Statistics", StatisticSchema, "statistics");
};
