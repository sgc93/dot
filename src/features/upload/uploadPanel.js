const vscode = require("vscode");
const getWebviewContent = require("./uploadWebContent");
const userData = require("../../utils/userData");
const createProject = require("../../api/upload");

const renameLng = (lngName) => {
	if (lngName.toLocaleLowerCase() === "javascript") {
		return "js";
	} else if (lngName.toLocaleLowerCase() === "javascriptreact") {
		return "react";
	}
};

const handleReceivedMessage = (message, context, panel, code, lngId) => {
	if (message.command === "redirect") {
		vscode.env.openExternal(message.data);
	} else if (message.command === "createProject") {
		const user = userData.getUserData(context);
		if (user && user.token) {
			let data = message.data;
			data = {
				...message.data,
				owner: user.userId,
				type: "snippet",
				lngName: renameLng(lngId),
			};
			const isCreated = createProject(data, user.token);
			if (isCreated) {
				const user = userData.getUserData(context);
				if (user) {
					panel.title = `DotCode - ${message.data.name}`;
					panel.webview.html = getWebviewContent(
						code,
						lngId,
						true,
						message.data
					);
					panel.webview.postMessage(user);
				}
			}
		} else {
			vscode.window.showErrorMessage(
				"No logged in account detected, please login first!"
			);
			vscode.commands.executeCommand("my-first-extension.login");
		}
	}
};

const uploadPanel = (event, context) => {
	const selection = event.selections[event.selections.length - 1];
	if (!event || !event.textEditor) {
		vscode.window.showErrorMessage("No active editor found.");
		return;
	}

	if (!selection) {
		vscode.window.showErrorMessage("No selection made.");
		return;
	}

	const selectedCode = event.textEditor.document.getText(selection);
	const languageId = event.textEditor.document.languageId;
	console.log("current lnguage mode: ", languageId);

	if (!selectedCode) {
		vscode.window.showErrorMessage("No code selected.");
		return;
	}

	const panel = vscode.window.createWebviewPanel(
		"codeSnippetView",
		"DotCode - Snippet",
		vscode.ViewColumn.One,
		{
			enableScripts: true,
		}
	);

	panel.webview.html = getWebviewContent(
		selectedCode,
		languageId === "javascriptreact" ? "React_Jsx" : languageId,
		false
	);

	panel.webview.onDidReceiveMessage((message) =>
		handleReceivedMessage(message, context, panel, selectedCode, languageId)
	);
};

module.exports = uploadPanel;
