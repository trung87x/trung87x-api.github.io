const axios = require('axios');

async function getCryptoPrice(symbol) {
  const coinIdMap = {
    btc: 'bitcoin',
    eth: 'ethereum',
    bnb: 'binancecoin',
    sol: 'solana',
    ada: 'cardano',
    // Thêm coin khác nếu cần
  };

  const coinId = coinIdMap[symbol.toLowerCase()];
  if (!coinId) {
    throw new Error('Unsupported coin symbol');
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;

  try {
    const response = await axios.get(url);
    const price = response.data[coinId]?.usd;

    if (!price) {
      throw new Error('Price not available');
    }

    return {
      symbol: symbol.toUpperCase(),
      price: price.toFixed(2),
      currency: 'USD',
    };
  } catch (error) {
    console.error('CoinGecko error:', error.response?.data || error.message);
    throw new Error('Failed to fetch price');
  }
}

module.exports = { getCryptoPrice };
