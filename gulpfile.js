'use strict';

// modules
const Connect = require('gulp-connect');
const Contentful = require('contentful');
const Gulp = require('gulp');
const Handlebars = require('handlebars');
const fs = require('fs');
const NodeSass = require('node-sass');
const Sass = require('gulp-sass');

// functions
const removeFolderRecursively = require('./functions/removeFolderRecursively');

// gulp files
const clean = require('./gulp/clean')(removeFolderRecursively);
const connect = require('./gulp/connect')(Connect);
const contentful = require('./gulp/contentful')(Contentful, fs);
const handlebars = require('./gulp/handlebars')(fs, Handlebars);
const sass = require('./gulp/sass')(Gulp, Sass, NodeSass);
const { series } = require('gulp');

// single tasks
exports.clean = clean;
exports.connect = connect;
exports.contentful = contentful;
exports.handlebars = handlebars;
exports.sass = sass;

// default task
exports.default = series(clean, contentful, handlebars, sass, connect);