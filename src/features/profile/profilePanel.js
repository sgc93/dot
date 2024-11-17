const vscode = require("vscode");
const userData = require("../../utils/userData");
const getProfileWebContent = require("./profileWebContent");
const redirect = require("../../utils/helpers");

const handleReceivedMessage = async (message, context) => {
	const user = userData.getUserData(context);

	if (message.command === "logout") {
		vscode.window.showInformationMessage(`${user.name}: logging out ...`);
	} else if (message.command === "detailProfile") {
		vscode.env.openExternal(`http://localhost:5173/profile/${user.userId}`);
	} else if (message.command === "redirect") {
		redirect(message.data);
	}
};

const dotCodeProfilePanel = (action, context) => {
	const user = userData.getUserData(context);

	if (user && user.token) {
		const panel = vscode.window.createWebviewPanel(
			"profile",
			`DotCode - ${action === "Account" ? user.name : action}`,
			vscode.ViewColumn.one,
			{
				enableScripts: true,
			}
		);

		if (!panel) {
			return;
		}

		panel.webview.html = getProfileWebContent(action);

		panel.webview.postMessage({
			command: "updateUser",
			data: user,
		});

		console.log("is user data posted: ", isPosted);

		panel.webview.onDidReceiveMessage(
			async (message) => handleReceivedMessage(message, context),
			undefined,
			context.subscriptions
		);
	} else {
		vscode.window
			.showInformationMessage(
				"No logged in account detected, please LOGIN first.",
				"Login"
			)
			.then((selection) => {
				if (selection === "Login") {
					vscode.commands.executeCommand("my-first-extension.login");
				}
			});
		vscode.commands.executeCommand("my-first-extension.login");
	}
};

module.exports = dotCodeProfilePanel;
