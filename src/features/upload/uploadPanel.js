const vscode = require("vscode");
const getWebviewContent = require("./uploadWebContent");
const userData = require("../../utils/userData");
const createProject = require("../../api/upload");

const renameLng = (lngName) => {
	if (lngName.toLocaleLowerCase() === "javascript") {
		return "js";
	} else if (lngName.toLocaleLowerCase() === "javascriptreact") {
		return "react";
	} else if (lngName === "") {
		return "other";
	} else {
		return lngName;
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

const uploadPanel = (codeContent, lngId, context) => {
	const panel = vscode.window.createWebviewPanel(
		"codeSnippetView",
		"DotCode - Snippet",
		vscode.ViewColumn.One,
		{
			enableScripts: true,
		}
	);

	panel.webview.html = getWebviewContent(codeContent, renameLng(lngId), false);

	panel.webview.onDidReceiveMessage((message) =>
		handleReceivedMessage(message, context, panel, codeContent, lngId)
	);
};

module.exports = uploadPanel;
