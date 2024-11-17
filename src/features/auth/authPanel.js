const vscode = require("vscode");
const getAuthWebContent = require("./authWebContent");
const handleLogin = require("../../api/login");
const redirect = require("../../utils/helpers");
const userData = require("../../utils/userData");
const getLoginSuccessWebContent = require("../../common/loginSuccessWebcontent");

const handleReceivedMessage = async (message, context, panel) => {
	const data = message.data;
	if (message.command === "login") {
		const isLoggedIn = await handleLogin(data, context);
		if (isLoggedIn) {
			console.log("You have logged in successfully");
			const user = userData.getUserData(context);
			if (user) {
				panel.title = `DotCode - ${user.name}`;
				panel.webview.html = getLoginSuccessWebContent();
			}
		}
	} else if (message.command === "signUp") {
		vscode.window.showInformationMessage(
			`Sign Up data:- name: ${data.name}, email: ${data.email}, password: ${data.password}, confirmPassword: ${data.confirmPassword}`
		);
	} else if (message.command === "redirect") {
		redirect(message.data);
	} else if (message.command === "openProfile") {
		panel.dispose();
		vscode.commands.executeCommand("my-first-extension.account");
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
		async (message) => await handleReceivedMessage(message, context, panel),
		undefined,
		context.subscriptions
	);
};

module.exports = dotCodeAuthPanel;
