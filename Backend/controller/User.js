const { error, response } = require("../Functions/Response");
const { Category } = require("../model/Category");
const { User } = require("../model/User");
const fs = require("fs");
exports.fetchUserById = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return response(res, 422, "Id is required");
    }
    const user = await User.findById(id);
    response(res, 200, "User retrived successfully", {
      id: user.id,
      addresses: user.addresses,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    });
  } catch (err) {
    error(res, err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return response(res, 422, "Id is required");
    }
    if (!id) {
      return response(res, 422, "Id is required");
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    response(res, 200, "User updated successfully", user);
  } catch (err) {
    error(res, err.message);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const exist = await User.findOne({ _id: req.user._id });
    if (exist) {
      let image;
      const _id = exist._id;
      if (req.file) {
        if (exist.image) {
          fs.unlinkSync(`public/profile/${exist?.image.id}`);
        }
        image = {
          id: req.file.filename,
          name: req.file.filename,
          url: "http://localhost:8080" + "/profile/" + req.file.filename,
        };
      }
      await User.findByIdAndUpdate(_id, {
        _id: req.user._id,
        image,
        name,
      });
      response(res, 200, "Profile updated Successfully");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: error.message });
  }
};
