'use strict';

const templatePath = './src/templates/page.hbs';
const pagesFolder = './content/pages';
const siteFolder = './site';

const handlebars = (fs, Handlebars) => (cb) => {
	if (!fs.existsSync(siteFolder)) {
		fs.mkdirSync(siteFolder);
	}

	fs.readdir(pagesFolder, (err, pages) => {
		if (err) {
			throw new Error(err);
		}

		pages.forEach(page => {
			const pageData = JSON.parse(fs.readFileSync(`${pagesFolder}/${page}`).toString());
			const pageTemplateString = fs.readFileSync(templatePath).toString();
			const pageTemplateCompiled = Handlebars.compile(pageTemplateString);
			const pageRendered = pageTemplateCompiled(pageData);

			fs.writeFileSync(`${siteFolder}/${pageData.fields.url}.html`, pageRendered);
		});
	});

	cb();
};

module.exports = handlebars;