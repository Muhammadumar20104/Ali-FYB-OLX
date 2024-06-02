const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProductById,
} = require("../controller/Product");
const fetchuser = require("../Functions/CheckUserToken");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//  /products is already added in base path
router.post("/", fetchuser, upload.array("images", 4), createProduct);
router.get("/", fetchAllProducts);
router.get("/:id", fetchuser, fetchProductById);
router.post("/:id", fetchuser, upload.array("images", 4), updateProduct);
router.post("/delete/:id", fetchuser, deleteProductById);

exports.router = router;
