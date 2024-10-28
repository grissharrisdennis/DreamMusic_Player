require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
// const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to get Spotify access token
app.get('/', (req, res) => res.send('Home Page Route'));
// Function to get access token
async function getAccessToken() {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'client_credentials'
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        }
      });
    return response.data.access_token;
  }
  
  // Function to fetch data from Spotify API
  async function fetchSpotifyApi(endpoint, method = 'GET') {
    const token = await getAccessToken();
    try {
      const response = await axios({
        url: `https://api.spotify.com/${endpoint}`,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Spotify:', error.response.data);
      throw error;
    }
  }

  
  // Route to fetch top tracks
  app.get('/api/top-tracks', async (req, res) => {
    try {
      console.log(process.env.SPOTIFY_CLIENT_ID)
      console.log(process.env.SPOTIFY_CLIENT_SECRET)
      const token = await getAccessToken();
      const response = await axios.get('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?market=US', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data)
      res.json(response.data.tracks);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      res.status(500).json({ error: 'Error fetching top tracks' });
    }
  });
  app.get('/api/search/', async (req, res) => {
    console.log(req.query.q);
    const searchQuery = req.query.q; // Get the query from request
    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    try {
      const token = await getAccessToken();
      
      // Fetch artist details
      const searchResponse = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchQuery,
          type: 'artist',
        },
      });
  
      const artist = searchResponse.data.artists.items[0];
      // console.log(artist)
      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }
  
      // Fetch artist's top tracks
      const topTracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          market: 'US',
        },
      });
  
      // Construct the final response with artist details and top tracks
      const responseData = {
        artist: {
          name: artist.name,
          image: artist.images[0]?.url || null, // Get the first image if available
          monthly_listeners: artist.followers.total // Number of followers represents monthly listeners
        },
        top_tracks: topTracksResponse.data.tracks // Send artist's top tracks back to frontend
      };
  
      res.json(responseData); // Send response with artist details and top tracks
    } catch (error) {
      console.error('Error fetching artist or top tracks:', error);
      res.status(500).json({ error: 'Error fetching artist or top tracks' });
    }
  });
  
  
  module.exports = app;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${process.env.PORT}`);
// });
