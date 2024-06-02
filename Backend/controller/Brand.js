const { response, error } = require("../Functions/Response");
const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    response(res, 200, "Brands retrived successfully", brands);
  } catch (err) {
    error(res, err.message);
  }
};

exports.createBrand = async (req, res) => {
  try {
    await Brand.create(req.body);
    response(res, 201, "Brand saved successfully");
  } catch (err) {
    error(res, err.message);
  }
};
