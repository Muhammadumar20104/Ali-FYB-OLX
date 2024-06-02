const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema({
  userId: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otpnumber: {
    type: Number,
  },
  otpchecker: {
    type: Date,
  },
});

module.exports = mongoose.model("otp", otpSchema);
