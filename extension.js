const getAllProjects = require("./src/api/projects");
const validator = require("./src/utils/validators");

const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	console.log('Congratulations, your extension "MyVSC" is now active!');

	const disposable = vscode.commands.registerCommand(
		"my-first-extension.searchDotCodeProjects",
		async function () {
			const projectItems = await getAllProjects();
			if (projectItems) {
				const selectedProject = await vscode.window.showQuickPick(
					projectItems,
					{
						title: "DotCode Public Projects",
						placeHolder: "Search Projects here ..",
					}
				);

				if (selectedProject === undefined) {
					vscode.window.showInformationMessage("No project is selected👍🏻");
				} else {
					await insertContentAtCursor(selectedProject);

					// handle creating new file and show content of selected project
					// await openProjectContent(selectedProject);
					// opening the selected project in the dotcode website
					// vscode.env.openExternal(selectedProject.link);
					vscode.window.showInformationMessage(
						`You have selected ${selectedProject.label}`
					);
				}

				console.log(selectedProject);
			}
		}
	);

	context.subscriptions.push(disposable);
}

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
				`${project.lngName} Code inserted at you cursor position.`
			);
		} else {
			let language = editor.document.languageId;
			language = language === "javascript" ? "js" : editor.document.languageId;

			if (validator.isCurrLngModeUiLng) {
				if (project.code[language]) {
					await editor.edit((editBuilder) =>
						editBuilder.insert(cursorPosition, project.code[language])
					);

					vscode.window.showInformationMessage(
						`${language.toUpperCase()} Code of selected UI inserted at you cursor position.`
					);
				} else {
					vscode.window.showErrorMessage(
						`Selected Ui component has no ${language} CONTENT.`
					);
				}
			} else {
				vscode.window.showErrorMessage(
					`Your current language mode ${language.toUpperCase()} is not a UI language in DotCode, do you want to insert the html part?`
				);
			}
		}
	} else {
		vscode.window.showErrorMessage(
			"No active editor found : Unable to access your cursor position"
		);
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
