const compileScss = (Gulp, Sass, NodeSass) => (cb) => {
	Sass.compiler = NodeSass;

	Gulp.src('./src/scss/**/*.scss')
		.pipe(Sass().on('error', Sass.logError))
		.pipe(Gulp.dest('./site'));
	cb();
};

module.exports = compileScss;