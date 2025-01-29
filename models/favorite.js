// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
