const express = require('express')
const router = express.router();
const { getBooks, addBook, deleteBook } = require('../controllers/bookController');

router.get('/', getBooks);
router.post('/', addBook);
router.delete('/:id', deleteBook);

module.exports = router;
