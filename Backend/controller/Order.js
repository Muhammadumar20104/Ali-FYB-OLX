const { error, response } = require("../Functions/Response");
const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return response(res, 422, "Id is required");
    }
    const orders = await Order.find({ user: id });
    response(res, 200, "Orders retrived successfully", orders);
  } catch (err) {
    error(res, err.message);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    response(res, 201, "Order created successfully",order);
  } catch (err) {
    error(res, err.message);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return response(res, 422, "Id is required");
    }
    const order = await Order.findByIdAndDelete(id);
    response(res, 200, "Order deleted successfully",order);
  } catch (err) {
    error(res, err.message);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return response(res, 422, "Id is required");
  }
  try {
    const order = await Order.findByIdAndUpdate(id, req.body,{new:true});
    response(res, 200, "Order updated successfully",order);
  } catch (err) {
    error(res, err.message);
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    let query = Order.find({ deleted: { $ne: true } });
    let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalOrdersQuery.count();

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    response(res, 200, "Orders retrived successfully", docs);
  } catch (err) {
    error(res, err.message);
  }
};
