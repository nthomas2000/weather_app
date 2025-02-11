const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (like CSS or images if needed)
app.use(express.static('public'));

// Route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London'; // Default city is London
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
        };
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});