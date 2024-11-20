const attachIcon = require("../../utils/attachIcon");

const handleSignUP = require("../../api/signUp");
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
			const user = userData.getUserData(context);
			if (user) {
				panel.title = `DotCode - ${user.name}`;
				panel.webview.html = getLoginSuccessWebContent();
				panel.webview.postMessage(user);
			}
			vscode.commands.executeCommand("dot-code.refreshSideBar");
		}
	} else if (message.command === "signUp") {
		const isSignedUp = await handleSignUP(data, context);
		if (isSignedUp) {
			const user = userData.getUserData(context);
			if (user) {
				panel.title = `DotCode - ${user.name}`;
				panel.webview.html = getLoginSuccessWebContent();
				panel.webview.postMessage(user);
			}
			vscode.commands.executeCommand("dot-code.refreshSideBar");
		}
	} else if (message.command === "redirect") {
		redirect(message.data);
	} else if (message.command === "openProfile") {
		panel.dispose();
		vscode.commands.executeCommand("dot-code.myAccount");
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
	attachIcon(panel, "resources/dotCode.svg", context);
	panel.webview.onDidReceiveMessage(
		async (message) => await handleReceivedMessage(message, context, panel),
		undefined,
		context.subscriptions
	);
};

module.exports = dotCodeAuthPanel;
