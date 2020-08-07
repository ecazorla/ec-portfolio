const clean = require('./gulp/clean');
const contentful = require('./gulp/contentful');
const { series } = require('gulp');

// single tasks
exports.clean = clean;
exports.contentful = contentful;

// default task
exports.default = series(clean, contentful);