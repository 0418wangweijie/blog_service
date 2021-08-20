// eslint-disable-next-line quotes
"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TypeSchema = new Schema({
    typeName: { type: String },
    sort: { type: Number },
    icon: { type: String },
  });

  return mongoose.model("Type", TypeSchema, "type");
};
