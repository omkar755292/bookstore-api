const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, require: true },
        email: { type: String, require: true, unique: [true, "Email already register" ]},
        password: { type: String, require: true }
    }
    ,
    { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;