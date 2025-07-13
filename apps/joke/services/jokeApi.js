const axios = require('axios');

async function getJokeForName(name) {
  try {
    const res = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
    const joke = res.data.joke || 'No joke found.';
    return joke.replace(/Chuck Norris/g, name);
  } catch (err) {
    console.error('JokeAPI Error:', err.message);
    return 'Oops! Could not fetch a joke.';
  }
}

module.exports = { getJokeForName };