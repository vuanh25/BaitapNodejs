var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelCategory = require("../models/category");
var validate = require("../validates/category");
const { validationResult } = require("express-validator");

router.get("/", async function (req, res, next) {
  var usersAll = await modelCategory.getall(req.query);
  usersAll = usersAll.filter((product) => product.isDelete !== true);
  responseData.responseReturn(res, 200, true, usersAll);
});
router.get("/:id", async function (req, res, next) {
  // get by ID
  try {
    var user = await modelCategory.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.post("/add", validate.validator(), async function (req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseData.responseReturn(
      res,
      400,
      false,
      errors.array().map((error) => error.msg)
    );
    return;
  }
  var product = await modelCategory.getByName(req.body.name);
  if (product) {
    responseData.responseReturn(res, 404, false, "category da ton tai");
  } else {
    const newProduct = await modelCategory.createcCategory({
      name: req.body.name,
      order: req.body.order,
    });
    responseData.responseReturn(res, 200, true, newProduct);
  }
});

router.get("/getAllCategoryAndProduct", async function (req, res, next) {
  var usersAll = await modelCategory.getAllCategoryAndProduct();
  responseData.responseReturn(res, 200, true, usersAll);
});

module.exports = router;
