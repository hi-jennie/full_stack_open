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

blogRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const updatedData = request.body;

  try {
    // check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    // by default findByIdAndUpdate returns the document before update
    // if you set the new option to true, it will return the document after update
    // runValidators: true ensures the updated data is validated against the schema
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error); // 交给 errorHandler 处理
  }
});

module.exports = blogRouter;
