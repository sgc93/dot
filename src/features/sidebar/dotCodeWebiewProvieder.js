const sideViewContent = require("./htmlContent");
const userData = require("../../utils/userData");
const vscode = require("vscode");

const handleReceivedMessage = (message) => {
	switch (message.command) {
		case "redirect":
			vscode.env.openExternal(message.data);
			break;
		case "account":
			vscode.commands.executeCommand("my-first-extension.myAccount");
			break;
		case "projects":
			vscode.commands.executeCommand("my-first-extension.myProjects");
			break;
		case "search":
			vscode.commands.executeCommand(
				"my-first-extension.searchDotCodeProjects"
			);
			break;
		case "signup":
			vscode.commands.executeCommand("my-first-extension.signUp");
			break;
		case "login":
			vscode.commands.executeCommand("my-first-extension.login");
			break;
		case "create":
			vscode.window.showInformationMessage(
				"select a code if it exists or write it on a file then select it, a popup info box will tell you to save it automatically"
			);
			break;
	}
};

class DotCodeWebViewProvider {
	constructor(context) {
		this.context = context;
	}

	resolveWebviewView(webviewView) {
		webviewView.webview.options = {
			enableScripts: true,
		};

		const user = userData.getUserData(this.context);

		webviewView.webview.html = sideViewContent(user && user.token, user);

		webviewView.webview.onDidReceiveMessage((message) =>
			handleReceivedMessage(message)
		);
	}
}

module.exports = DotCodeWebViewProvider;
