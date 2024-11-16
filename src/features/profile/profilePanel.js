const getProfileWebContent = require("./profileWebContent");
const vscode = require("vscode");
const handleLogin = require("../../api/login");

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
		async (message) => {
			const data = message.data;
			if (message.command === "login") {
				await handleLogin(data);
			} else if (message.command === "signUp") {
				vscode.window.showInformationMessage(
					`Sign Up data:- name: ${data.name}, email: ${data.email}, password: ${data.password}, confirmPassword: ${data.confirmPassword}`
				);
			}
		},
		undefined,
		context.subscriptions
	);
};

module.exports = dotCodeProfilePanel;
