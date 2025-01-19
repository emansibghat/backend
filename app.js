const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // User route handlers
const bookRoutes = require('./routes/bookRoutes'); // Book route handlers
const UserModel = require('./models/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if DB connection fails
  });

// Login Route
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  UserModel.findOne({ name })
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (user.password !== password)
        return res.status(401).json({ message: 'Invalid credentials' });

      res.json({ message: 'Logged in successfully' });
    })
    .catch((err) => res.status(500).json({ error: 'Server error', details: err }));
});

// Signup Route
app.post('/signup', (req, res) => {
  const { username, name, email, password } = req.body;

  UserModel.create({ username, name, email, password })
    .then((user) => res.status(201).json({ message: 'User created successfully', user }))
    .catch((err) =>
      res.status(500).json({ error: 'Failed to create user', details: err })
    );
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
