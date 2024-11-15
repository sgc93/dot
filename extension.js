const vscode = require("vscode");
const search = require("./src/features/search/search");
const dotCodeAuthPanel = require("./src/features/auth/authPanel");

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	console.log('Congratulations, your extension "MyVSC" is now active!');

	const disposable = vscode.commands.registerCommand(
		"my-first-extension.searchDotCodeProjects",
		async function () {
			await search();
		}
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("my-first-extension.login", () =>
			dotCodeAuthPanel("Login")
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand("my-first-extension.signUp", () =>
			dotCodeAuthPanel("Sign Up")
		)
	);

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
