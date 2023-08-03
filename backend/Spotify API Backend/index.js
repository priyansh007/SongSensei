const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    console.log('Received code:', code); // Log the code to see if it's received correctly

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
        },
      }
    );

    console.log('Response from Spotify API:', response.data); // Log the response from Spotify API

    const { access_token } = response.data;
    res.send({ access_token });
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
