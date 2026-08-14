const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set credentials matching your MongoDB container setup
const MONGO_USER = process.env.MONGO_USER || 'admin';
const MONGO_PASS = process.env.MONGO_PASS || 'secretpassword';
const MONGO_HOST = process.env.MONGO_HOST || 'mongo'; // Your container name
const DB_NAME    = 'user-account';

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:27017/${DB_NAME}?authSource=admin`;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// Schema & Model
const UserSchema = new mongoose.Schema({
  userid: { type: Number, default: 1 },
  name: String,
  email: String,
  interests: String
});

const User = mongoose.model('User', UserSchema);

// GET User Profile
app.get('/get-profile', async (req, res) => {
  try {
    let user = await User.findOne({ userid: 1 });
    if (!user) {
      user = await User.create({
        userid: 1,
        name: 'Anna Samson',
        email: 'anna.samson@example.com',
        interests: 'coding'
      });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Database fetch failed' });
  }
});

// UPDATE User Profile
app.post('/update-profile', async (req, res) => {
  try {
    const { name, email, interests } = req.body;
    
    const updatedUser = await User.findOneAndUpdate(
      { userid: 1 },
      { name, email, interests },
      { returnDocument: 'after', upsert: true }
    );

    console.log('✅ Data updated in MongoDB:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('❌ Error updating profile:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});