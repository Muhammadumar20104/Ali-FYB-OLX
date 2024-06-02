const { error, response } = require("../Functions/Response");
const { Product } = require("../model/Product");
const fs = require("fs");
exports.createProduct = async (req, res) => {
  try {
    let data = req.body;
    if (req.files.length < 4) {
      for (let i = 0; i < req.files.length; i++) {
        fs.unlinkSync(`public/product/${req.files[i].filename}`);
      }
      return response(res, 422, `Four images are required`);
    }
    const imageArray = await req.files?.map((file) => {
      return {
        id: file.filename,
        name: file.filename,
        url: "http://localhost:8080" + "/product/" + file.filename,
      };
    });
    data.images = imageArray;
    data = await Product.create(data);
    response(res, 200, "Products added successfully", data);
  } catch (err) {
    error(res, err.message);
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    let condition = {};
    if (!req.query.admin) {
      condition.deleted = { $ne: true };
    }

    let query = Product.find(condition);
    let totalProductsQuery = Product.find(condition);

    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({
        category: req.query.category,
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalProductsQuery.count();

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const docs = await query.exec();
    response(res, 200, "Products retrived successfully", {
      product: docs,
      totalDocs,
    });
  } catch (err) {
    error(res, err.message);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return response(res, 422, "Id is required");
  }
  try {
    const product = await Product.findById(id);
    response(res, 200, "Products retrived successfully", product);
  } catch (err) {
    error(res, err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    let productData = req.body;
    if (!_id) {
      return response(res, 404, "Product id is required");
    }
    const product = await Product.findOne({ _id });
    let imageArray = [];
    productData.deleteImages = JSON.parse(productData.deleteImages);
    productData.previousImages = JSON.parse(productData.previousImages);
    if (product) {
      if (!product.isAddProduct) {
        const data = await Product.findOneAndUpdate({ id: _id }, req.body);
        response(res, 200, "Products updated successfully", data);
      } else {
        if (req.files.length > 0) {
          if (productData?.deleteImages?.length > 0) {
            for (let i = 0; i < productData.deleteImages.length; i++) {
              const id = productData.deleteImages[i].id;
              productData.previousImages.map((item, index) => {
                if (item.id == id) {
                  fs.unlinkSync(`public/product/${item.id}`);
                }
              });
              imageArray = productData.previousImages.filter(
                (item) => item.id != id
              );
              productData.previousImages = imageArray;
            }
            await req.files?.map((file) => {
              let obj = {
                id: file.filename,
                name: file.filename,
                url: "http://localhost:8080" + "/product/" + file.filename,
              };
              imageArray.push(obj);
            });
          } else {
            imageArray = productData.previousImages;
            await req.files?.map((file) => {
              let obj = {
                id: file.filename,
                name: file.filename,
                url: "http://localhost:8080" + "/product/" + file.filename,
              };
              imageArray.push(obj);
            });
          }
        } else if (productData.deleteImages.length > 0) {
          for (let i = 0; i < productData.deleteImages.length; i++) {
            const id = productData.deleteImages[i].id;
            productData.previousImages.map((item, index) => {
              if (item.id == id) {
                fs.unlinkSync(`public/product/${item.id}`);
              }
            });
            imageArray = productData.previousImages.filter(
              (item) => item.id != id
            );
            productData.previousImages = imageArray;
          }
        } else {
          delete productData.images;
          delete productData.previousImages;
        }
        if (
          imageArray.length ||
          productData.deleteImages.length == product.images.length
        ) {
          productData.images = imageArray;
        }
        const newProductData = await Product.findByIdAndUpdate(
          { _id },
          productData,
          { new: true }
        );
        return response(
          res,
          200,
          "Product updated successfully",
          newProductData
        );
      }
    } else {
      return response(res, 404, "Product not found");
    }
  } catch (err) {
    return error(res, err.message);
  }
};
exports.deleteProductById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return response(res, 422, "Id is required");
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    product?.images?.map((imagePath) => {
      const imagePathToDelete = `public/product/${imagePath?.id}`;
      fs.unlinkSync(imagePathToDelete);
    });
    response(res, 200, "Products deleted successfully", product);
  } catch (err) {
    error(res, err.message);
  }
};
