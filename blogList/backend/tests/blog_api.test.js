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
  console.log('actual returnedBlogs', response.body);
  assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
});
