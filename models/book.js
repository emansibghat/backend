const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String }, 
    content: { type: String }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);
