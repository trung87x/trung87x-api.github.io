const posts = require('../data/posts');

posts.push({ id: '123', title: 'Hello', content: 'World' }); // Example post for testing

exports.showAllPosts = (req, res) => {
  res.render('blog-index', {
    title: 'Blog',
    posts:  posts,
    layout: 'layouts/layout-blog', // Specify the layout to use
  });
};

exports.showNewForm = (req, res) => {
  res.render('new', { title: 'Create Post' });
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
  res.render('apps/blog/views/edit', { title: 'Edit Post', post });
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
