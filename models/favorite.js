// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference the user
  bookId: { type: Number, required: true }, // Book ID from the frontend
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String }, // Book image URL
});

module.exports = mongoose.model('Favorite', favoriteSchema);
