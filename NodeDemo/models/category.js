var SchemaCategory = require("../schema/category");

module.exports = {
  getall: function (categories) {
    var sort = {};
    var Search = {
      isdelete: false,
    };
    if (categories.sort) {
      if (categories.sort[0] == "-") {
        sort[categories.sort.substring(1)] = "desc";
      } else {
        sort[categories.sort] = "asc";
      }
    }
    if (categories.key) {
      Search.name = new RegExp(categories.key, "i");
    }
    var limit = parseInt(categories.limit) || 2;
    var page = parseInt(categories.page) || 1;
    var skip = (page - 1) * limit;
    return SchemaCategory.find(Search)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate({
        path: "products",
        match: { isDelete: false },
      })
      .exec();
  },
  getOne: function (id) {
    return SchemaCategory.findById(id);
  },
  createcCategory: function (category) {
    return new SchemaCategory(category).save();
  },
  getByName: function (name) {
    return SchemaCategory.findOne({ name }).exec();
  },
};
