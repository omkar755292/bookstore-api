const asyncHandler = require('express-async-handler');
const bookModel = require('../models/bookModel');
//@desc get all books
//@routes GET /book/api
//acess private
const getBooks = asyncHandler(async (req, res) => {
    const books = await bookModel.find({ user_id: req.user.id });
    res.status(200).json(books);
});

//@desc get book by id
//@routes GET /book/api/id
//acess private
const getBook = asyncHandler(async (req, res) => {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book Not Found");
    }
    if (book.user_id != req.user.id) {
        res.status(403);
        throw new Error("user not allow to acess other user contact");
    }
    res.status(200).json(book);
});

//@desc post new book
//@routes POST /book/api
//acess private
const postBook = asyncHandler(async (req, res) => {
    const { book_name, book_author, book_price } = req.body;
    if (!book_name || !book_author || !book_price) {
        res.status(400);
        throw new Error("All filds are mandatory");
    }
    const book = await bookModel.create({
        book_name,
        book_author,
        book_price,
        user_id: req.user.id
    });
    res.status(201).json(book);
});

//@desc update book by id
//@routes PUT /book/api/id
//acess private
const updateBook = asyncHandler(async (req, res) => {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book Not Found");
    }
    if (book.user_id != req.user.id) {
        res.status(403);
        throw new Error("user not allow to acess other user contact");
    }
    const updatebook = await bookModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatebook);
});

//@desc delete book by id
//@routes DELETE /book/api/id
//acess public
const deleteBook = asyncHandler(async (req, res) => {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book Not Found");
    }
    if (book.user_id != req.user.id) {
        res.status(403);
        throw new Error("user not allow to acess other user contact");
    }
    const deletebook = await bookModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletebook);
});

// @desc delete all books
//@routes DELETE /book/api
//acess public
const deleteBooks = asyncHandler(async (req, res) => {
    const deletebooks = await bookModel.deleteMany({ user_id: req.user.id });
    res.status(200).json({ message: "All Books are Remove" });
});

module.exports = { getBooks, getBook, postBook, updateBook, deleteBook, deleteBooks };