
const express = require('express');
const router = express.Router();
const { addBookToFavorites, removeBookFromFavorites,getFavorites } = require('../controllers/favoriteController');

// Route to add a book to the user's favorites
router.post('/add', addBookToFavorites);
router.get("/fetch",getFavorites)

// Route to remove a book from the user's favorites
router.delete('/remove', removeBookFromFavorites);

module.exports = router;
