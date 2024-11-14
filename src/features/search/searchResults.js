const vscode = require("vscode");
const validator = require("../../utils/validators");

async function openProjectContent(project) {
	const isSnippet = project.type === "snippet";
	try {
		if (isSnippet) {
			const document = await vscode.workspace.openTextDocument({
				content: isSnippet ? project.code.code : project.code.html,
				language: isSnippet ? project.lngName : "html",
			});

			await vscode.window.showTextDocument(document, { preview: false });
		} else {
			[
				{ code: project.code.html, lng: "html" },
				{ code: project.code.css, lng: "css" },
				{ code: project.code.js, lng: "javascript" },
			].forEach(async (file) => {
				const document = await vscode.workspace.openTextDocument({
					content: file.code,
					language: file.lng,
				});

				await vscode.window.showTextDocument(document, { preview: false });
			});
		}
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to open project: ${error.message}`);
	}
}

async function insertContentAtCursor(project) {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const cursorPosition = editor.selection.active;

		if (project.type === "snippet") {
			await editor.edit((editBuilder) =>
				editBuilder.insert(cursorPosition, project.code.code)
			);
			vscode.window.showInformationMessage(
				`${
					project.lngName === "other" ? "" : project.lngName
				} Code inserted at you cursor position.`
			);
		} else {
			let language = editor.document.languageId;
			language = language === "javascript" ? "js" : editor.document.languageId;

			if (validator.isCurrLngModeUiLng(language)) {
				if (project.code[language]) {
					await editor.edit((editBuilder) =>
						editBuilder.insert(cursorPosition, project.code[language])
					);

					vscode.window.showInformationMessage(
						`${language.toUpperCase()} Code of selected UI inserted at you cursor position.`
					);
				} else {
					vscode.window
						.showErrorMessage(
							`Selected Ui component has no ${language} CONTENT.`,
							language !== "html" &&
								project.code.html.length > 0 &&
								"Insert HTML",
							language !== "css" && project.code.css.length > 0 && "Insert CSS",
							language !== "js" &&
								project.code.js.length > 0 &&
								"Insert JavaScript"
						)
						.then(async (selection) => {
							if (selection === "Insert HTML") {
								await editor.edit((editBuilder) =>
									editBuilder.insert(cursorPosition, project.code.html)
								);

								vscode.window.showInformationMessage(
									`HTML Code of selected UI inserted at you cursor position.`
								);
							} else if (selection === "Insert CSS") {
								await editor.edit((editBuilder) =>
									editBuilder.insert(cursorPosition, project.code.css)
								);

								vscode.window.showInformationMessage(
									`CSS Code of selected UI inserted at you cursor position.`
								);
							} else if (selection === "Insert JavaScript") {
								await editor.edit((editBuilder) =>
									editBuilder.insert(cursorPosition, project.code.js)
								);

								vscode.window.showInformationMessage(
									`JavaScript Code of selected UI inserted at you cursor position.`
								);
							}
						});
				}
			} else {
				vscode.window
					.showErrorMessage(
						`Your current language mode ${language.toUpperCase()} is not a UI language in DotCode, do you want still insert?`,
						"Insert HTML",
						"Insert CSS",
						"Insert JavaScript"
					)
					.then(async (selection) => {
						if (selection === "Insert HTML") {
							await editor.edit((editBuilder) =>
								editBuilder.insert(cursorPosition, project.code.html)
							);

							vscode.window.showInformationMessage(
								`HTML Code of selected UI inserted at you cursor position.`
							);
						} else if (selection === "Insert CSS") {
							await editor.edit((editBuilder) =>
								editBuilder.insert(cursorPosition, project.code.css)
							);

							vscode.window.showInformationMessage(
								`CSS Code of selected UI inserted at you cursor position.`
							);
						} else if (selection === "Insert JavaScript") {
							await editor.edit((editBuilder) =>
								editBuilder.insert(cursorPosition, project.code.js)
							);

							vscode.window.showInformationMessage(
								`JavaScript Code of selected UI inserted at you cursor position.`
							);
						}
					});
			}
		}
	} else {
		vscode.window.showErrorMessage(
			"No active editor found : Unable to access your cursor position"
		);
	}
}

function openInDotCode(project) {
	vscode.env.openExternal(project.link);
}

module.exports = { openProjectContent, insertContentAtCursor, openInDotCode };
