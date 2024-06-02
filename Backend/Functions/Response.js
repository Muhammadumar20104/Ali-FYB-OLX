const response = (res, statusCode, message, data) => {
  res.status(statusCode).json({ statusCode:statusCode, message, data });
};

const error = (res, message) => {
  res.status(500).json({ statusCode: 500, message });
};

module.exports = { response, error };
