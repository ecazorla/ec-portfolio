const cleanContentFolder = (removeFolderRecursively) => (cb) => {
	removeFolderRecursively('./content/');
	removeFolderRecursively('./site/');
	cb();
};

module.exports = cleanContentFolder;