const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');

//@desc get all users
//@routes GET /api/admin
//@public public
const getUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find();
    res.json(users);
});

//@desc get user by id
//@routes GET /api/admin/id
//@public public
const getUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error ("user not found");
    }
    res.json(user);
});

// @desc update user data
// @routes PUT /api/admin/id
// @public public
// const updateUserData = asyncHandler(async (req, res) => {
//     const user = await userModel.findById(req.params.id);
//     if(!user){
//         res.status(404);
//         throw new Error ("user not found");
//     }
//     const updateuserdata = await userModel.findByIdAndUpdate(req.params.id,req.body);
//     res.json({ message: "user data is updated" });
// });


//@desc delete user
//@routes DELETE /api/admin/id
//@public public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error ("user not found");
    }
    const deleteuser = await userModel.findByIdAndDelete(req.params.id);
    res.json({ message: "user data is delete" });
});

//@desc delete all users
//@routes DELETE /api/admin
//@public public
const deleteUsers = asyncHandler(async (req, res) => {
    const users = await userModel.deleteMany();
    res.json({ message: "all users are removed" });
});

module.exports = {getUsers,getUser,deleteUser,deleteUsers}