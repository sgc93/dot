const getAuthWebContent = require("./authWebContent");
const vscode = require("vscode");

const dotCodeAuthPanel = (action) => {
	const panel = vscode.window.createWebviewPanel(
		"account",
		`DotCode - ${action}`,
		vscode.ViewColumn.one,
		{
			enableScripts: true,
		}
	);

	panel.webview.html = getAuthWebContent(action);
};

module.exports = dotCodeAuthPanel;
