const compileScss = (Gulp, Sass, Sourcemaps, NodeSass) => (cb) => {
	Sass.compiler = NodeSass;

	Gulp.src('./src/scss/**/*.scss')
		.pipe(Sourcemaps.init())
		.pipe(Sass({
			outputStyle: 'compressed'
		}).on('error', Sass.logError))
		.pipe(Sourcemaps.write())
		.pipe(Gulp.dest('./site/css'))
		.on('end', cb);
};

module.exports = compileScss;