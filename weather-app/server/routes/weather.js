const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY; 
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

module.exports = router;



