var express = require("express");
var router = express.Router();
var SchemaDepartment = require("../schema/deparment");
var responseData = require("../helper/responseData");
var mongoose = require("mongoose");

router.get("/", async function (req, res, next) {
  var allDepartment = await SchemaDepartment.find({}).populate({
    path: "employees",
    select: "_id userName",
  });
  responseData.responseReturn(res, 200, true, allDepartment);
});

router.post("/Create", async function (req, res, next) {
  try {
    const name = req.body.name;
    console.log(name);
    const newDepartment = await SchemaDepartment.create({ name });

    responseData.responseReturn(res, 201, true, newDepartment);
  } catch (error) {
    console.error("Error creating department:", error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const departmentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return responseData.responseReturn(
        res,
        400,
        false,
        "Invalid department ID"
      );
    }

    const department = await SchemaDepartment.findById(departmentId).populate({
      path: "employees",
      select: "_id userName",
    });

    if (!department) {
      return responseData.responseReturn(
        res,
        404,
        false,
        "Department not found"
      );
    }

    responseData.responseReturn(res, 200, true, department);
  } catch (error) {
    console.error("Error getting department by ID:", error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});
router.put("/:id", async function (req, res, next) {
  try {
    const departmentId = req.params.id;
    const { name } = req.body;

    // Kiểm tra xem ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return responseData.responseReturn(
        res,
        400,
        false,
        "Invalid department ID"
      );
    }

    // Lấy thông tin của bộ phận dựa trên ID
    const department = await SchemaDepartment.findById(departmentId);

    // Kiểm tra xem bộ phận có tồn tại hay không
    if (!department) {
      return responseData.responseReturn(
        res,
        404,
        false,
        "Department not found"
      );
    }

    // Cập nhật thông tin bộ phận
    department.name = name;
    await department.save();

    // Trả về thông tin của bộ phận sau khi cập nhật
    responseData.responseReturn(res, 200, true, department);
  } catch (error) {
    console.error("Error updating department by ID:", error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});
router.delete("/:id", async function (req, res, next) {
  try {
    const departmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return responseData.responseReturn(
        res,
        400,
        false,
        "Invalid department ID"
      );
    }
    console.log(departmentId);
    const department = await SchemaDepartment.findOneAndDelete({
      _id: departmentId,
    });

    if (!department) {
      return responseData.responseReturn(
        res,
        404,
        false,
        "Department not found"
      );
    }

    responseData.responseReturn(
      res,
      200,
      true,
      "Department deleted successfully"
    );
  } catch (error) {
    console.error("Error deleting department by ID:", error);
    responseData.responseReturn(res, 500, false, "Internal Server Error");
  }
});

module.exports = router;
