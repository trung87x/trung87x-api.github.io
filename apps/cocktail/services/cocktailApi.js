const axios = require('axios');

async function getRandomCocktail() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  try {
    const response = await axios.get(url);
    const drink = response.data.drinks[0];

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure || ''} ${ingredient}`.trim());
      }
    }

    return {
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      instructions: drink.strInstructions,
      ingredients,
    };
  } catch (error) {
    console.error('Error fetching cocktail:', error.message);
    throw new Error('Could not fetch cocktail');
  }
}

module.exports = { getRandomCocktail };