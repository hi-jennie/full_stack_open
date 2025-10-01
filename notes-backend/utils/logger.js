const info = (...params) => {
  // avoid logging during tests or else the test output will be cluttered
  // it does not print to the console in test mode
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
