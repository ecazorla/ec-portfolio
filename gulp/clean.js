'use strict';

const cleanContentFolder = (removeFolderRecursively) => (cb) => {
	removeFolderRecursively('./content/', true);
	removeFolderRecursively('./site/', true);
	cb();
};

module.exports = cleanContentFolder;