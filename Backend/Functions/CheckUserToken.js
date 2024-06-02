const jwt = require("jsonwebtoken");
const { response, error } = require("./Response");
const { User } = require("../model/User");
const fetchuser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return response(res, 401, "Please authenticate using a valid token");
    }
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") { return response(res, 401, "Invalid token format");}

    try {
      const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.user);

      if (!user) {
        return response(res, 401, "User not found in the database");
      }
      req.user = user;
      next();
    } catch (error) {
      return response(res, 401, "Please authenticate using a valid token");
    }
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = fetchuser;
