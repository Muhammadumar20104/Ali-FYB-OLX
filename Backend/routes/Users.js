const express = require("express");
const { fetchUserById, updateUser, updateProfile } = require("../controller/User");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

//  /users is already added in base path
router.get("/own", fetchUserById).patch("/:id", updateUser);
router.post("/update", upload.single("image"),updateProfile);

exports.router = router;
