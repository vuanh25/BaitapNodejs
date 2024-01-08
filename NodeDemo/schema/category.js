var mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  isdelete: { type: Boolean, default: false },
});

module.exports = mongoose.model("category", schema);
