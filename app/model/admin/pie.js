"use strict";

// module.exports = app => {
//     const mongoose = app.mongoose;
//     const Schema = mongoose.Schema;

//     const PieSchema = new Schema({
//         value: { type: String },
//         name: { type: String },
//         typeId: { type: String },
//     });

//     return mongoose.model('Pie', PieSchema, 'pie');
// }

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PieSchema = new Schema({
    name: { type: String },
    value: { type: Number },
    typeId: { type: String },
  });

  return mongoose.model("Pie", PieSchema, "pie");
};
