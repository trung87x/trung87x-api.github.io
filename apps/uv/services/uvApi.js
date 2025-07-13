const axios = require('axios');

const API_KEY = 'openuv-guejyrmd14gr78-io'; // 🔁 Thay bằng token thật nếu bạn có

async function getUvData(lat, lng) {
  const url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'x-access-token': API_KEY,
      },
    });

    const uv = response.data.result.uv;

    return {
      uv,
      safe: uv < 3,
      message: uv < 3
        ? '☁️ UV thấp, không cần kem chống nắng.'
        : '☀️ UV cao, nên bôi kem chống nắng!',
    };
  } catch (error) {
    console.error('OpenUV error:', error.message);
    throw new Error('Failed to fetch UV data');
  }
}

module.exports = { getUvData };