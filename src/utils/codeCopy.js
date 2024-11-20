const vscode = require("vscode");

const handleCopy = async (code) => {
	try {
		await vscode.env.clipboard.writeText(code);
		vscode.window.showInformationMessage("Code is copied👍🏻");
	} catch (error) {
		vscode.window.showErrorMessage("Code is not copied, ", error.message);
	}
};

module.exports = handleCopy;
