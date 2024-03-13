const express = require('express');
const { getUsers, getUser, deleteUser, deleteUsers } = require('../controller/adminController');

const adminRouter = express.Router();

adminRouter.route('/').get(getUsers);
adminRouter.route('/:id').get(getUser);
adminRouter.route('/:id').delete(deleteUser);
adminRouter.route('/').delete(deleteUsers);

module.exports = adminRouter;