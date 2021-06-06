'use strict';

// modules
require('dotenv').config();

// constants
const folderToSaveFiles = './content';

const downloadPages = (Contentful, fs) => (cb) => {
	const client = Contentful.createClient({
		// This is the space ID. A space is like a project folder in Contentful terms
		space: process.env.CF_SPACE,
		// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
		accessToken: process.env.CF_TOKEN,
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

			for (const entry of entries.items) {
				if (entry.sys.contentType.sys.id === 'page') {
					const pageData = JSON.stringify(entry);
					const pageName = entry.fields.url;

					fs.writeFileSync(`${folderToSaveFiles}/pages/${pageName}.json`, pageData, (err) => {
						if (err) {
							throw err;
						}

						console.log(`Page data file created on ${folderToSaveFiles}/${pageName}`);
					});
				}
			}

			cb();
		})
		.catch((err) => {
			console.log(err);
			cb(err);
		});
};

module.exports = downloadPages;
