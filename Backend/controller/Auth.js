const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const otpModal = require("../model/Otp");
const emailSender = require("../Functions/EmailSender");
const otpSender = require("../Functions/OtpSender");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");
// Create User

const createUser = async (req, res) => {
  try {
    const result = validationResult(req);
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res.status(422).json({
        message: `password and confirm password doesn't match`,
      });
    }
    if (result.isEmpty()) {
      const exist = await User.findOne({ email: email });
      if (exist) {
        return res.status(422).json({
          status: 422,
          message: "Email already exist",
          verified: exist.verified,
        });
      }
      const salt = await bcrypt.genSalt(10);
      const dbpassword = await bcrypt.hash(password.toString(), salt);
      await User.create({
        name: name,
        email: email,
        password: dbpassword,
        verified: false,
      });
      res.status(201).json({
        status: 201,
        message: "Successfully Signup",
        data: {
          name,
          email,
          verified: false,
        },
      });
    } else {
      res.status(422).json({ message: result.errors[0].msg });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: 500 });
  }
};

// Verify Email

const verifyEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const exist = await User.findOne({ email });
    console.log(exist,email);
    if (exist) {
      emailSender(email, res, process.env.JWT_SECRET_KEY);
    } else {
      res.status(404).send({
        status: 404,
        message: "Account not found please signup first",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: 500 });
  }
};
// Verfied Account
const verifyAccount = async (req, res) => {
  try {
    const { nm } = req.params;
    const { cd } = req.query;
    const exist = await User.findOne({ _id: nm });
    const id = {
      user: exist._id,
    };
    const accessToken = jwt.sign(id, process.env.JWT_SECRET_KEY);

    if (exist.verified) {
      return res.status(408).json({
        status: 403,
        message: "Email Already verified",
        data: {
          name: exist.name,
          email: exist.email,
          id: exist._id,
        },
        accessToken,
      });
    } else {
      const emailCompare = await bcrypt.compare(exist.email, cd);

      if (nm == exist._id && emailCompare) {
        await User.findByIdAndUpdate(
          exist._id,
          {
            verified: true,
          },
          { new: true }
        );

        return res.status(200).json({
          status: 200,
          message: "Email successfully verified",
          data: {
            name: exist.name,
            email: exist.email,
          },
          accessToken,
        });
      } else {
        return res
          .status(406)
          .json({ status: 406, message: "Email not verified" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: 500 });
  }
};
// Reset password with otp

const resetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        status: 404,
        message: "Email is required",
      });
    }
    const checkEmail = await User.findOne({ email: email });

    if (!checkEmail) {
      return res.status(404).json({
        status: 404,
        message: "Account doesn't found please signup first",
      });
    }

    let otp = Math.floor(Math.random() * 9999 + 1100);
    const exist = await otpModal.findOne({ email });
    if (exist) {
      await otpModal.findByIdAndUpdate(exist._id, {
        userId: exist._id,
        email,
        otpnumber: otp,
        otpchecker: Date.now() + 600000,
      });
    } else {
      await otpModal.create({
        email,
        otpnumber: otp,
        otpchecker: Date.now() + 600000,
      });
    }
    otpSender(email, otp, res);
  } catch (error) {
    res.status(500).send({ message: error.message, status: 500 });
  }

  //   await
};
// Verify Otp
const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const exist = await otpModal.findOne({
      email,
      otpnumber: otp,
      otpchecker: { $gt: Date.now() },
    });
    if (!exist) {
      return res.status(401).json({ status: 401, message: "Invalid OTP" });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "OTP successfully verified" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: 500 });
  }
};

// New password
const newPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!password) {
      return res.status(204).json({
        message: `Missing password field`,
      });
    }
    if (password.length < 7) {
      return res.status(206).json({
        message: "Password length cannnot less than 6",
      });
    }
    if (password != confirmPassword) {
      return res.status(206).json({
        message: `password and confirm password doesn't match`,
      });
    }
    const exist = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const dbPassword = await bcrypt.hash(password.toString(), salt);
    if (exist) {
      await User.findByIdAndUpdate(
        exist._id,
        {
          password: dbPassword,
        },
        { new: true }
      );
      await otpModal.findByIdAndUpdate(exist._id, {
        otpnumber: null,
        otpchecker: null,
      });
      return res
        .status(200)
        .json({ status: 200, message: `password updated successfully` });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: 500 });
  }
};
// Login
const loginUser = async (req, res) => {
  try {
    const result = validationResult(req);
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    if (!exist.verified) {
      return res
        .status(403)
        .json({ status: 403, message: "account not verified" });
    }
    if (!result.isEmpty()) {
      return res.status(401).json({ message: result.errors[0].msg });
    }

    if (exist) {
      const id = {
        user: exist._id,
      };
      const accessToken = jwt.sign(id, process.env.JWT_SECRET_KEY);
      const ispassword = await bcrypt.compare(password.toString(), exist.password);
      if (ispassword && email == exist.email) {
        return res.status(200).json({
          status: 200,
          message: "Login successfully",
          data: {
            name: exist.name,
            email: exist.email,
            id: exist._id,
          },
          accessToken,
        });
      } else {
        return res
          .status(401)
          .json({ status: 401, message: "Invalid Password" });
      }
    } else {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: 500 });
  }
};
module.exports = {
  verifyEmail,
  createUser,
  verifyAccount,
  resetPasswordOtp,
  verifyOtp,
  newPassword,
  loginUser,
};
