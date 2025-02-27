const sideViewContent = require("./htmlContent");
const userData = require("../../utils/userData");
const vscode = require("vscode");

const handleReceivedMessage = (message) => {
	switch (message.command) {
		case "redirect":
			vscode.env.openExternal(message.data);
			break;
		case "account":
			vscode.commands.executeCommand("dot-code.myAccount");
			break;
		case "projects":
			vscode.commands.executeCommand("dot-code.myProjects");
			break;
		case "search":
			vscode.commands.executeCommand("dot-code.searchDotCodeProjects");
			break;
		case "signup":
			vscode.commands.executeCommand("dot-code.signUp");
			break;
		case "login":
			vscode.commands.executeCommand("dot-code.login");
			break;
		case "create":
			vscode.window.showInformationMessage(
				"select a code if it exists or write it on a file then select it, a popup info box will tell you to save it automatically"
			);
			vscode.commands.executeCommand("dot-code.createProject");
			break;
	}
};

class DotCodeWebViewProvider {
	constructor(context) {
		this.user = userData.getUserData(context);
		this.context = context;
		this.currentView = null;
	}

	resolveWebviewView(webviewView) {
		this.currentView = webviewView;
		webviewView.webview.options = {
			enableScripts: true,
		};

		webviewView.webview.html = sideViewContent(
			this.user && this.user.token,
			this.user
		);

		webviewView.webview.onDidReceiveMessage((message) =>
			handleReceivedMessage(message)
		);
	}

	refreshContent() {
		const user = userData.getUserData(this.context);
		this.currentView.webview.html = sideViewContent(user && user.token, user);
	}
}

module.exports = DotCodeWebViewProvider;
