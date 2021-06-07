const lintScss = (Gulp, Stylelint) => (cb) => {
	Gulp.src('src/scss/style.scss')
		.pipe(Stylelint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}))
		.on('end', cb);
};

module.exports = lintScss;