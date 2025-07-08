const posts = require('../data/posts');

posts.push({ id: '123', title: 'Hello', content: 'World' }); // Example post for testing
posts.push({ id: '123', title: 'Hello', content: 'World' }); // Example post for testing
posts.push({ id: '123', title: 'Hello', content: 'World' }); // Example post for testing
posts.push({ id: '123', title: 'Hello', content: 'World' }); // Example post for testing

exports.showAllPosts = (req, res) => {
  res.render('blog-index', { title: 'Blog', posts:  posts, layout: 'layouts/blog-layout'
  });
};

exports.showNewForm = (req, res) => {
  res.render('blog-new', { title: 'Create Post', layout: 'layouts/blog-layout' });
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const id = Date.now().toString();
  posts.push({ id, title, content });
  res.redirect('/blog');
};

exports.showEditForm = (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.send('Not found');
  res.render('blog-edit', { title: 'Edit Post', post, layout: 'layouts/blog-layout' });
};

exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/blog');
};

exports.deletePost = (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) posts.splice(index, 1);
  res.redirect('/blog');
};
