const sideViewContent = require("./htmlContent");

class DotCodeWebViewProvider {
	constructor(context) {
		this.context = context;
	}

	resolveWebviewView(webviewView) {
		webviewView.webview.options = {
			enableScripts: true,
		};

		webviewView.webview.html = sideViewContent();

		webviewView.webview.onDidReceiveMessage(() => {
			// message will be handled here
		});
	}
}

module.exports = DotCodeWebViewProvider;
