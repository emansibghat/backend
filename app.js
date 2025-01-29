const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Debug logs
console.log('Environment Variables Check:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI ? 'EXISTS' : 'MISSING');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

// Routes
app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/favorites', favoriteRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
