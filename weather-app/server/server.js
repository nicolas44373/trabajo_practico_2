const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Query = require('./models/Query'); // Importa tu modelo Query

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('Mongo URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const weatherRoutes = require('./routes/weather');
app.use('/weather', weatherRoutes);

// Ruta para guardar los datos del clima en la base de datos
app.post('/saveWeatherData', async (req, res) => {
  try {
    const { name, main, weather } = req.body; // Extrae los datos del clima del cuerpo de la solicitud
    const newQuery = new Query({
      city: name,
      temperature: main.temp,
      description: weather[0].description
    });

    await newQuery.save();

    res.status(201).json({ message: 'Weather data saved successfully' });
  } catch (error) {
    console.error('Error saving weather data to database', error);
    res.status(500).json({ error: 'Unable to save weather data to database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
