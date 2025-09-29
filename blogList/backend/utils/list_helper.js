const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authorCounts = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(
    Object.entries(authorCounts),
    ([author, count]) => count
  );
  return topAuthor ? { author: topAuthor[0], blogs: topAuthor[1] } : null;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const mostLike = _.maxBy(blogs, (blog) => blog.likes);
  return mostLike ? { author: mostLike.author, likes: mostLike.likes } : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
