const { getUvData } = require('../services/uvApi');

exports.showForm = (req, res) => {
  res.render('uv-form', { title: 'Check UV Index', error: null, layout: 'layouts/uv-layout' });
};

exports.checkUv = async (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.render('uv-form', {
      title: 'Check UV Index',
      error: 'Please enter both latitude and longitude',
      layout: 'layouts/uv-layout',
    });
  }

  try {
    const result = await getUvData(lat, lng);
    res.render('uv-result', {
      title: 'UV Result',
      lat,
      lng,
      ...result,
      layout: 'layouts/uv-layout',
    });
  } catch {
    res.render('uv-form', {
      title: 'Check UV Index',
      error: 'Could not retrieve UV data. Check coordinates or try later.',
      layout: 'layouts/uv-layout',
    });
  }
};