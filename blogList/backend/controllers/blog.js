const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const newCreatedBlog = await blog.save();

  response.status(201).json(newCreatedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

module.exports = blogRouter;
