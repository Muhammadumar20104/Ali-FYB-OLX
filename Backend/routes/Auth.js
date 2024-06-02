const express = require('express');
const { createUser,  verifyEmail, verifyAccount, resetPasswordOtp, verifyOtp, newPassword, loginUser } = require('../controller/Auth');
const { signUpMiddleWare, loginMiddleware } = require('../middleware.js/Middleware');

const router = express.Router();
//  /auth is already added in base path
router.post('/signup',signUpMiddleWare, createUser)
.post('/login',loginMiddleware, loginUser)
.post('/verifyemail', verifyEmail)
.get('/:nm/verify', verifyAccount)
.post('/resetpassword', resetPasswordOtp)
.post('/verifyotp', verifyOtp)
.post('/newpassword', newPassword)
// .get('/check', checkAuth);
exports.router = router;