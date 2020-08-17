const jsFolder = './src/js';
const jsFolderDestination = './site/js';

const javascript = (fs) => async (cb) => {
	const jsFiles = fs.readdirSync(jsFolder);

	if (!fs.existsSync(jsFolderDestination)) {
		fs.mkdirSync(jsFolderDestination);
	}

	await Promise.all(jsFiles.map(jsFile => {
		const fileData = fs.readFileSync(`${jsFolder}/${jsFile}`).toString();
		fs.writeFileSync(`${jsFolderDestination}/${jsFile}`, fileData);
	}));
	cb();
};

module.exports = javascript;