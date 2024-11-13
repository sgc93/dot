const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log(
		'Congratulations, your extension "my-first-extension" is now active!'
	);

	const disposable = vscode.commands.registerCommand(
		"my-first-extension.helloWorld",
		function () {
			vscode.window.showInformationMessage(
				"Hello World from My first extension!"
			);
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
