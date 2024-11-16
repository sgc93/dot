const getProfileWebContent = require("./profileWebContent");
const vscode = require("vscode");
const redirect = require("../../utils/helpers");

const handleReceivedMessage = async (message) => {
	if (message.command === "logout") {
		vscode.window.showInformationMessage("logging out ...");
	} else if (message.command === "detailProfile") {
		vscode.env.openExternal("http://localhost:5173/profile/dfsdflsdf");
	} else if (message.command === "redirect") {
		redirect(message.data);
	}
};

const dotCodeProfilePanel = (action, context) => {
	const panel = vscode.window.createWebviewPanel(
		"profile",
		`DotCode - ${action}`,
		vscode.ViewColumn.one,
		{
			enableScripts: true,
		}
	);

	panel.webview.html = getProfileWebContent(action);
	panel.webview.onDidReceiveMessage(
		async (message) => handleReceivedMessage(message),
		undefined,
		context.subscriptions
	);
};

module.exports = dotCodeProfilePanel;
