const User = require('../models/User');
const Book = require('../models/Book');
const Favorite = require('../models/Favorite');

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
    const { id } = req.params; // Book ID
    const { userId } = req.query; // User ID from query parameters

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    const updatedFavorites = user.favorites.filter(fav => fav._id.toString() !== id.toString());
    user.favorites = updatedFavorites;
    await user.save();

    // Respond with the updated favorites
    return res.status(200).json(updatedFavorites);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return res.status(500).json({ message: "Error removing from favorites" });
  }
};
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.query;
    const favoriteItems = await Favorite.find({ userId: userId });
    if (!favoriteItems) {
      return res.status(200).json({ message: "items not found" });
    }
    return res.status(200).json(favoriteItems);
  } catch (error) {
    console.error("Error getting favorites:", error);
    return res.status(500).json({ message: "Error getting favorites" });
  }

}

module.exports = {
  addBookToFavorites,
  removeBookFromFavorites,
  getFavorites
};
