
const express = require('express');
const router = express.Router();
const { addBookToFavorites, removeBookFromFavorites } = require('../controllers/favoriteController');

// Route to add a book to the user's favorites
router.post('/add', addBookToFavorites);

// Route to remove a book from the user's favorites
router.delete('/remove/:id', removeBookFromFavorites);

module.exports = router;
