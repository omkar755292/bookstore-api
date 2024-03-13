const express = require('express');
const { registerUser, userLogin, userRoot } = require('../controller/userController');
const validateToken = require('../middleware/validateToken');

const userRouter = express.Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(userLogin);
userRouter.route('/root').get(validateToken, userRoot);

module.exports = userRouter;