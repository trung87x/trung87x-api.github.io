const { getJokeForName } = require('../services/jokeApi');

exports.showForm = (req, res) => {
  res.render('joke-form', { title: 'Get a Joke', error: null, layout: 'layouts/joke-layout' });
};

exports.showJoke = async (req, res) => {
  const name = req.body.name?.trim();
  if (!name) {
    return res.render('joke-form', { title: 'Get a Joke', error: 'Please enter a name.', layout: 'layouts/joke-layout' });
  }
  const joke = await getJokeForName(name);
  res.render('joke-result', { title: 'Your Joke', name, joke, layout: 'layouts/joke-layout' });
};