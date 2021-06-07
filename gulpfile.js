'use strict';

// modules
const Connect = require('gulp-connect');
const Contentful = require('contentful');
const Gulp = require('gulp');
const Handlebars = require('handlebars');
const Favicons = require('favicons');
const fs = require('fs');
const NodeSass = require('node-sass');
const Sass = require('gulp-sass');
const Sitemap = require('sitemap');
const Sourcemaps = require('gulp-sourcemaps');
const Stylelint = require('gulp-stylelint');

// functions
const removeFolderRecursively = require('./functions/removeFolderRecursively');

// gulp files
const clean = require('./gulp/clean')(removeFolderRecursively);
const connect = require('./gulp/connect')(Connect);
const contentful = require('./gulp/contentful')(Contentful, fs);
const favicon = require('./gulp/favicon')(Gulp, Favicons.stream);
const handlebars = require('./gulp/handlebars')(fs, Handlebars);
const javascript = require('./gulp/javascript')(fs);
const sass = require('./gulp/sass')(Gulp, Sass, Sourcemaps, NodeSass);
const sitemap = require('./gulp/sitemap')(Sitemap, fs);
const { series, watch } = require('gulp');
const stylelint = require('./gulp/stylelint')(Gulp, Stylelint);

// single tasks
exports.clean = clean;
exports.connect = connect;
exports.contentful = contentful;
exports.favicon = favicon;
exports.handlebars = handlebars;
exports.javascript = javascript;
exports.sass = sass;
exports.sitemap = sitemap;
exports.stylelint = stylelint;

// watchers
exports.watch = () => {
	watch('src/scss/**/*.scss', sass);
	watch('src/partials/*.hbs', handlebars);
	watch('src/templates/*.hbs', handlebars);
};

// default task
exports.default = series(stylelint, clean, contentful, favicon, handlebars, sass, javascript, sitemap, connect);
exports.build = series(stylelint, clean, contentful, favicon, handlebars, sass, sitemap, javascript);