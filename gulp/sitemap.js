const sitemap = (Sitemap, fs) => async (cb) => {
	const { SitemapStream, streamToPromise } = Sitemap;
	const { Readable } = require('stream');

	const files = fs.readdirSync('./site').filter(fileName => {
		return fileName.split('.').pop() === 'html';
	}).map(fileName => {
		return {
			url: fileName,
			priority: 1
		};
	});
	
	const stream = new SitemapStream({ hostname: 'https://www.ecazorla.com' });
	const sitemap = await streamToPromise(Readable.from(files).pipe(stream)).then((data) => data.toString());
	fs.writeFile('./site/sitemap.xml', sitemap, cb);
};

module.exports = sitemap;