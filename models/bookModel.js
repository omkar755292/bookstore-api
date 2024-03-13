const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        user_id:{type:mongoose.Schema.ObjectId, require: true, ref:"user"},
        book_name: { type: String, require: true, trim: true },
        book_author: { type: String, require: true, trim: true },
        book_price: { type: Number, require: true, trim: true },
        book_img: { type: String }
    }
    ,
    { timestamps: true }
);

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;