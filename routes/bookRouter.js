const express = require('express');
const bookRouter = express.Router();
const { getBooks,getBook,postBook,updateBook,deleteBook,deleteBooks } = require('../controller/bookController');
const validateToken = require('../middleware/validateToken');

bookRouter.use(validateToken);
bookRouter.route('/').get(getBooks);
bookRouter.route('/:id').get(getBook);
bookRouter.route('/').post(postBook);
bookRouter.route('/:id').put(updateBook);
bookRouter.route('/:id').delete(deleteBook);
bookRouter.route('/').delete(deleteBooks);

module.exports = bookRouter;