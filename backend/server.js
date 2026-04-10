const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/polls', require('./routes/polls'));

const buildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(buildPath)) {
  console.log('Serving frontend build from:', buildPath);
  app.use(express.static(buildPath));
  app.use((req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.log('Frontend build not found at:', buildPath);
  app.get('/', (req, res) => {
    res.send('Backend is running. Frontend build not found.');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));