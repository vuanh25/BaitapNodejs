const { body } = require("express-validator");
const message = require("../helper/message");
const util = require("util");

var options = {
  name: {
    min: 5,
    max: 60,
  },
};

module.exports = {
  validator: function () {
    return [
      body(
        "name",
        util.format(
          message.size_string_message,
          "name",
          options.name.min,
          options.name.max
        )
      ).isLength(options.name),
    ];
  },
};
