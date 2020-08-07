const removeFolderRecursively = require('../functions/removeFolderRecursively');
const cleanContentFolder = (cb) => {
	removeFolderRecursively('./content/');
	cb();
};

module.exports = cleanContentFolder;