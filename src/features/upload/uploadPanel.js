const vscode = require("vscode");
const getWebviewContent = require("./uploadWebContent");

const uploadPanel = (event) => {
	const selection = event.selections[event.selections.length - 1];
	// Validate event and textEditor
	if (!event || !event.textEditor) {
		vscode.window.showErrorMessage("No active editor found.");
		return;
	}

	// Validate selection
	if (!selection) {
		vscode.window.showErrorMessage("No selection made.");
		return;
	}

	const selectedCode = event.textEditor.document.getText(selection);
	const languageId = event.textEditor.document.languageId;

	// Validate selected code
	if (!selectedCode) {
		vscode.window.showErrorMessage("No code selected.");
		return;
	}

	// Create the webview panel
	const panel = vscode.window.createWebviewPanel(
		"codeSnippetView",
		"Code Snippet",
		vscode.ViewColumn.One,
		{
			enableScripts: true,
		}
	);

	panel.webview.html = getWebviewContent(selectedCode, languageId);

	// Handle messages from the webview
	panel.webview.onDidReceiveMessage((message) => {
		switch (message.command) {
			case "saveSnippet":
				vscode.window.showInformationMessage(
					"Snippet Saved: " + message.content
				);
				break;
		}
	});
};

module.exports = uploadPanel;
