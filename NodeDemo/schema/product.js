var mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  isDelete: { type: Boolean, default: false },
  order: Number,
});

module.exports = mongoose.model("product", schema);
