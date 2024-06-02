const express = require('express');
const { fetchCategories, createCategory } = require('../controller/Category');
const fetchuser = require('../Functions/CheckUserToken');

const router = express.Router();
//  /categories is already added in base path
router.get('/', fetchCategories).post('/',fetchuser,createCategory)

exports.router = router;