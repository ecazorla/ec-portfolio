'use strict';

// modules
const Contentful = require('contentful');
const Handlebars = require('handlebars');
const fs = require('fs');

// functions
const removeFolderRecursively = require('./functions/removeFolderRecursively');

// gulp files
const clean = require('./gulp/clean')(removeFolderRecursively);
const contentful = require('./gulp/contentful')(Contentful, fs);
const handlebars = require('./gulp/handlebars')(fs, Handlebars);
const { series } = require('gulp');

// single tasks
exports.clean = clean;
exports.contentful = contentful;
exports.handlebars = handlebars;

// default task
exports.default = series(clean, contentful, handlebars);