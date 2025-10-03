const assert = require('node:assert');
const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const testHelper = require('./api_testHelper');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  // clear the database before each test
  await Blog.deleteMany({});
  // insert many initial blogs
  await Blog.insertMany(testHelper.initialBlogs);
  console.log('Database initialized');
});

test('blogs are returned in json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('return all blogs', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
});

test('blog has id property instead of _id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;
  blogs.forEach((blog) => {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'John Doe',
    url: 'https://example.com/new-blog',
    likes: 2,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  const urls = blogsAtEnd.map((blog) => blog.url);
  assert(titles.includes('New Blog'));
  assert(urls.includes('https://example.com/new-blog'));
});

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'New Blog1',
    author: 'John Doe',
    url: 'https://example.com/new-blog',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  const addedBlog = blogsAtEnd.find((blog) => blog.title === 'New Blog1');
  assert.strictEqual(addedBlog.likes, 0);
});

test('blog without title fields is not added', async () => {
  const newBlog = {
    author: 'John Doe',
    url: 'https://example.com/new-blog',
    likes: 2,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await testHelper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length);
});

test('blog without url fields is not added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'John Doe',
    likes: 2,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await testHelper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length);
});

after(() => {
  mongoose.connection.close();
});
