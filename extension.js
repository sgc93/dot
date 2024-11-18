const uploadPanel = require("./src/features/upload/uploadPanel");

const dotCodeProfilePanel = require("./src/features/profile/profilePanel");

const vscode = require("vscode");
const search = require("./src/features/search/search");
const dotCodeAuthPanel = require("./src/features/auth/authPanel");

/**
 * @param {vscode.ExtensionContext} context
 */

let selectionTimer = null;

function activate(context) {
	console.log('Congratulations, your extension "MyVSC" is now active!');

	context.subscriptions.push(
		vscode.window.onDidChangeTextEditorSelection((event) => {
			if (selectionTimer) {
				clearTimeout(selectionTimer);
				selectionTimer = null;
			}

			const selection = event.selections[0];
			let notification;
			if (!selection) {
				if (notification) {
					notification.dispose();
				}
			} else {
				selectionTimer = setTimeout(() => {
					notification = vscode.window
						.showInformationMessage(
							"You have selected code snippets",
							"Save Snippet"
						)
						.then((selection) => {
							if (selection === "Save Snippet") {
								uploadPanel(event);
							}
						});
				}, 700);
			}
		})
	);

	const disposable = vscode.commands.registerCommand(
		"my-first-extension.searchDotCodeProjects",
		async function () {
			await search();
		}
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("my-first-extension.login", () =>
			dotCodeAuthPanel("Login", context)
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand("my-first-extension.signUp", () =>
			dotCodeAuthPanel("Sign Up", context)
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand("my-first-extension.logout", () =>
			dotCodeProfilePanel("Log Out", context)
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand("my-first-extension.myProjects", () =>
			dotCodeProfilePanel("Projects", context)
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand("my-first-extension.myAccount", () =>
			dotCodeProfilePanel("Account", context)
		)
	);

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
