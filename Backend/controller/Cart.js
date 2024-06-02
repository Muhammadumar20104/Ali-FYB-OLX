const { error, response } = require("../Functions/Response");
const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return response(res, 422, "Id is required");
    }

    const cartItems = await Cart.find({ user: id }).populate("product");
    response(res, 200, "Cart data retrived successfully", cartItems);
  } catch (err) {
    error(res, err.message);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return response(res, 422, "Id is required");
    }
    const doc = await Cart.create({ ...req.body, user: id });
    const item = await Cart.findOne({ _id: doc._id }).populate("product");

    response(res, 201, "Product add to cart successfully", item);
  } catch (err) {
    error(res, err.message);
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return response(res, 422, "Id is required");
    }
    const doc = await Cart.findByIdAndDelete(id);
    response(res, 200, "Product delete from cart successfully", doc);
  } catch (err) {
    error(res, err.message);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return response(res, 422, "Id is required");
    }
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate("product");
    response(res, 200, "Cart updated successfully", result);
  } catch (err) {
    error(res, err.message);
  }
};
