const express = require('express');
const { getBooks, addBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getBooks);
router.post('/', protect, addBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
