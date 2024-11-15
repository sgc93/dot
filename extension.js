const DotCodeWebViewProvider = require("./src/features/sidebar/dotCodeWebiewProvieder");

const search = require("./src/features/search/search");

const vscode = require("vscode");

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

	const sidebarProvider = new DotCodeWebViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("dotCodeView", sidebarProvider)
	);

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
