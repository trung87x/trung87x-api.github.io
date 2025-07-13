const { willItRainTomorrow } = require('../services/weatherApi');

exports.showForm = (req, res) => {
  res.render('weather-form', { title: 'Weather Check', error: null, layout: 'layouts/weather-layout' });
};

exports.checkWeather = async (req, res) => {
  const city = req.body.city?.trim();
  if (!city) {
    return res.render('weather-form', { title: 'Weather Check', error: 'Please enter a city name.', layout: 'layouts/weather-layout' });
  }

  try {
    const rain = await willItRainTomorrow(city);
    res.render('weather-result', { title: 'Weather Result', city, rain, layout: 'layouts/weather-layout' });
  } catch {
    res.render('weather-form', { title: 'Weather Check', error: 'Could not get weather info.', layout: 'layouts/weather-layout' });
  }
};