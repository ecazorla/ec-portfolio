const favicon = (Gulp, Favicons) => (cb) => {
	Gulp.src('./src/assets/ec-logo.png')
		.pipe(
			Favicons({
				appName: 'Esteban Cazorla',
				appShortName: 'EC',
				appDescription: 'Full-stack Developer based in London',
				developerName: 'Esteban Cazorla',
				developerURL: 'https://www.ecazorla.com/',
				background: '#2b4d82',
				path: '',
				url: 'https://www.ecazorla.com/',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
				version: 1.0,
				logging: false,
				html: 'favicons.hbs',
				pipeHTML: true,
				replace: true,
			}))
		.pipe(Gulp.dest('./site/'))
		.on('end', cb);
};

module.exports = favicon;