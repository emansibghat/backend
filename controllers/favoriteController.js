const User = require('../models/User');
const Book = require('../models/Book');
const Favorite = require('../models/Favorite');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const addBookToFavorites = async (req, res) => {

  try {

    const { userId, bookId } = req.body;

    if (!userId || !bookId) {

      return res.status(200).json({ message: "User Id or Book Id is missing " });
    }

    const bookexsist = await Favorite.findOne({ userId: userId, bookId: bookId });
    if (bookexsist) {
      return res.status(400).json({ message: "Book already in favorites" });
    }

    const favitem = await Favorite.create({ userId: userId, bookId: bookId });
    await favitem.save();

    return res.status(200).json({ message: "Book added to favorites" });

  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Error adding to favorites" });
  }
};

// Remove from Favorites
const removeBookFromFavorites = async (req, res) => {
  try {
    const { bookId,userId } = req.query; 

    const favoriteItem = await Favorite.findOneAndDelete({  userId: new ObjectId(userId), 
      bookId: new ObjectId(bookId)});
    if (!favoriteItem) {
      return res.status(400).json({ message: "Favorite not found" });
    }

    return res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return res.status(500).json({ message: "Error removing from favorites" });
  }
};
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.query; 
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }
    
    const favoriteItems = await Favorite.find({ userId }).populate("bookId");
    return res.status(200).json(favoriteItems);
  } catch (error) {
    console.error("Error getting favorites:", error);
    return res.status(500).json({ message: "Error getting favorites" });
  }
};

module.exports = {
  addBookToFavorites,
  removeBookFromFavorites,
  getFavorites
};
