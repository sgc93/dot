const vscode = require("vscode");
const getAuthWebContent = require("./authWebContent");
const handleLogin = require("../../api/login");
const redirect = require("../../utils/helpers");
const userData = require("../../utils/userData");

const handleReceivedMessage = async (message) => {
	const data = message.data;
	if (message.command === "login") {
		await handleLogin(data);
	} else if (message.command === "signUp") {
		vscode.window.showInformationMessage(
			`Sign Up data:- name: ${data.name}, email: ${data.email}, password: ${data.password}, confirmPassword: ${data.confirmPassword}`
		);
	} else if (message.command === "redirect") {
		redirect(message.data);
	}
};

const dotCodeAuthPanel = (action, context) => {
	const panel = vscode.window.createWebviewPanel(
		"account",
		`DotCode - ${action}`,
		vscode.ViewColumn.one,
		{
			enableScripts: true,
		}
	);

	panel.webview.html = getAuthWebContent(action);
	panel.webview.onDidReceiveMessage(
		async (message) => await handleReceivedMessage(message),
		undefined,
		context.subscriptions
	);
};

module.exports = dotCodeAuthPanel;
