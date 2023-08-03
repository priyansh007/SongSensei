const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3001; // Choose any available port

app.use(cors()); // Use cors middleware to handle CORS

app.use(express.json());

app.get('/search', async (req, res) => {
  try {
    const searchQuery = encodeURIComponent(req.query.q);
    const searchUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`;
    const response = await axios.get(searchUrl);
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
