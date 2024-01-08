var mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  isdelete: { type: Boolean, default: false },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

module.exports = mongoose.model("category", schema);
