const { getCryptoPrice } = require('../services/cryptoApi');

exports.showForm = (req, res) => {
  res.render('crypto-form', { title: 'Crypto Price Checker', error: null, layout: 'layouts/crypto-layout' });
};

exports.checkPrice = async (req, res) => {
  const symbol = req.body.symbol?.toUpperCase().trim();

  if (!symbol) {
    return res.render('crypto-form', {
      title: 'Crypto Price Checker',
      error: 'Please enter a valid symbol like BTC-USD',
      layout: 'layouts/crypto-layout',
    });
  }

  try {
    const result = await getCryptoPrice(symbol);
    console.log(`Price for ${symbol}:`, result);
    res.render('crypto-result', {
      title: 'Crypto Price Result',
      symbol: result.symbol,
      price: result.price,
      currency: result.currency,
      layout: 'layouts/crypto-layout',
    });
  } catch {
    res.render('crypto-form', {
      title: 'Crypto Price Checker',
      error: 'Could not retrieve price for this symbol.',
      layout: 'layouts/crypto-layout',
    });
  }
};