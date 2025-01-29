const Book = require('../models/Book');
const cloudinary = require('../config/cloudinary');

// Fetch all books
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }

    res.status(200).json({
      books,
      currentPage: page,
      totalPages,
      totalBooks,
      hasMore: page < totalPages
    });
  } catch (err) {
    res.status(500).json({ message: `Error fetching books: ${err.message}` });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const { title, author, description } = req.body;
  const coverImage = req.file;

  if (!title || !author || !description) {
    return res.status(400).json({ message: 'Title, author, and description are required' });
  }

  try {
    let coverImageUrl = '';
    if (coverImage) {

      const b64 = Buffer.from(coverImage.buffer).toString('base64');
      const dataURI = `data:${coverImage.mimetype};base64,${b64}`;
      
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
        folder: 'books_cover'
      });
      coverImageUrl = uploadResponse.secure_url;
    }

    const newBook = new Book({
      title,
      author,
      description,
      coverImage: coverImageUrl
    });

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
