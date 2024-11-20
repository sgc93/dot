const vscode = require("vscode");

const attachIcon = (panel, path, context) => {
	const iconPath = vscode.Uri.file(context.asAbsolutePath(path));
	panel.iconPath = iconPath;
};

module.exports = attachIcon;
