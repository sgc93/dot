const vscode = require("vscode");

const redirect = (link) => {
	vscode.env.openExternal(link);
};

module.exports = redirect;
