const startServer = (Connect) => (cb) => {
	Connect.server({
		root: 'site',
		livereload: true
	});

	cb();
};

module.exports = startServer;