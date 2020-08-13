const lintScss = (Gulp, Stylelint) => (cb) => {
	cb();

	Gulp.src('src/scss/style.scss')
		.pipe(Stylelint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}));
};

module.exports = lintScss;