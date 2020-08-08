'use strict';

const credentials = require('../config/contentful');

// constants
const folderToSaveFiles = './content';

const downloadPages = (Contentful, fs) => (cb) => {
	const client = Contentful.createClient({
		// This is the space ID. A space is like a project folder in Contentful terms
		space: credentials.space,
		// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
		accessToken: credentials.accessToken,
		environment: 'master'
	});

	if (!fs.existsSync(folderToSaveFiles)) {
		fs.mkdirSync(folderToSaveFiles);
	}

	client.getEntries()
		.then((entries) => {
			console.log('Data downloaded from Contentful');

			const pagesDirectory = `${folderToSaveFiles}/pages`;
			if (!fs.existsSync(pagesDirectory)) {
				fs.mkdirSync(pagesDirectory);
			}

			entries.items.forEach(entry => {
				if (entry.sys.contentType.sys.id === 'page') {
					const pageData = JSON.stringify(entry);
					const pageName = entry.fields.url;

					fs.writeFile(`${folderToSaveFiles}/pages/${pageName}.json`, pageData, (err) => {
						if (err) {
							throw err;
						}

						console.log(`Page data file created on ${folderToSaveFiles}/${pageName}`);
					});
				}
			});

			cb();
		})
		.catch((err) => {
			console.log(err);
			cb();
		});
};

module.exports = downloadPages;
