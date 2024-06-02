const express = require('express');
const { fetchBrands, createBrand } = require('../controller/Brand');
const fetchuser = require('../Functions/CheckUserToken');

const router = express.Router();
//  /brands is already added in base path
router.get('/', fetchBrands).post('/',fetchuser, createBrand);

exports.router = router;