const Book = require('../models/Book');

// Fetch all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: `Error fetching books: ${err.message}` });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const { title, author, description, coverImage, content } = req.body;
  if (!title || !author || !description) {
    return res.status(400).json({ message: 'Title, author, and description are required' });
  }

  try {
    const newBook = new Book({ title, author, description, coverImage, content });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: `Error adding book: ${err.message}` });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.remove();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Error deleting book: ${err.message}` });
  }
};

module.exports = { getBooks, addBook, deleteBook };
