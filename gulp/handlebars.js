'use strict';

const templatePath = './src/templates/page.hbs';
const pagesFolder = './content/pages';
const partialsFolder = './src/partials';
const siteFolder = './site';

const handlebars = (fs, Handlebars) => async (cb) => {
	if (!fs.existsSync(siteFolder)) {
		fs.mkdirSync(siteFolder);
	}

	// Register partials
	const partialsFiles = fs.readdirSync(partialsFolder);
	await Promise.all(partialsFiles.map((partialName) => {
		console.log(`Handlebars.js: registering  partial ${partialName}`);
		const partialNameNoExtension = partialName.split('.')[0];
		const partialPath = `${partialsFolder}/${partialName}`;
		const partialData = fs.readFileSync(partialPath).toString();
		Handlebars.registerPartial(partialNameNoExtension, partialData);
	}));

	const faviconsData = fs.readFileSync('./site/favicons.hbs').toString();
	Handlebars.registerPartial('favicons', faviconsData);

	// Compiling pages
	const pagesFiles = fs.readdirSync(pagesFolder);
	await Promise.all(pagesFiles.map((pageName) => {
		console.log(`Handlebars.js: compiling page ${pageName}`);
		const pageData = JSON.parse(fs.readFileSync(`${pagesFolder}/${pageName}`).toString());
		const pageTemplateString = fs.readFileSync(templatePath).toString();
		const pageTemplateCompiled = Handlebars.compile(pageTemplateString);
		const pageRendered = pageTemplateCompiled(pageData);

		fs.writeFileSync(`${siteFolder}/${pageData.fields.url}.html`, pageRendered);
	}));

	cb();
};

module.exports = handlebars;