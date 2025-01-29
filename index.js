const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API Routes
app.use('/api', routes);

// MongoDB Connection (FIXED: Removed useFindAndModify)
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listener for successful connection
mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

// Event listener for connection errors
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
