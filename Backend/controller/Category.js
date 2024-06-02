const { error, response } = require("../Functions/Response");
const { Category } = require("../model/Category");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    response(res, 200, "Categories retrived successfully", categories);
  } catch (err) {
    error(res, err.message);
  }
};

exports.createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    response(res, 201, "Category created successfully");
  } catch (err) {
    error(res, err.message);
  }
};
