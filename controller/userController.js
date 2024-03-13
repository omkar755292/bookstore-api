const userModel = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc register user
//@routes POST /api/user/register
//@acess public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Details are Mandatory");
    }

    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("user already register");
    }

    //hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    });

    if (user) {
        res.status(201);
        res.json({ message: "new user created", username, email });
    } else {
        res.status(400);
        throw new Error("user data is not valid");
    }
});

//@desc login user
//@routes POST /api/user/login
//@acess public
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All Fields are Mandatory');
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("user not found");
    }
    //compaire password with hash password
    let passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECERT, { expiresIn: '15m' }
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid");
    }

});

//@desc get user detail
//@routes GET /api/user/root
//@acess private
const userRoot = asyncHandler(async (req, res) => {
    res.status(200);
    res.json(req.user);
});

module.exports = { registerUser, userLogin, userRoot }