const axios = require('axios');

const API_KEY = '38bb5e42aa496f86c0f168046d1a2264'; // 🔁 thay bằng key thật của bạn

async function willItRainTomorrow(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    const forecasts = response.data.list;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowDateStr = tomorrow.toISOString().split('T')[0];

    const rainTomorrow = forecasts.some(entry => {
      const dateStr = entry.dt_txt.split(' ')[0];
      return dateStr === tomorrowDateStr && entry.weather.some(w => w.main === 'Rain');
    });

    return rainTomorrow;
  } catch (err) {
    console.error('OpenWeatherMap Error:', err.message);
    throw new Error('Could not fetch weather');
  }
}

module.exports = { willItRainTomorrow };