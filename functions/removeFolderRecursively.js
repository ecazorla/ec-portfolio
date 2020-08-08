'use strict';

const fs = require('fs');
const Path = require('path');

const deleteFolderRecursive = (path, removeParent = false) => {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			const curPath = Path.join(path, file);

			if (fs.lstatSync(curPath).isDirectory()) {
				deleteFolderRecursive(curPath, true);
			} else {
				fs.unlinkSync(curPath);
			}
		});

		if (removeParent === true) {
			fs.rmdirSync(path);
		}
	}
};

module.exports = deleteFolderRecursive;