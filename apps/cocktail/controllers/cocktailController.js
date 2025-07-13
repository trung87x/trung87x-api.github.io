const { getRandomCocktail } = require('../services/cocktailApi');

exports.showRandomCocktail = async (req, res) => {
  try {
    const cocktail = await getRandomCocktail();
    res.render('cocktail-show', {
      title: 'Random Cocktail',
      cocktail,
      layout: 'layouts/cocktail-layout',
    });
  } catch (err) {
    res.status(500).send('Error loading cocktail');
  }
};