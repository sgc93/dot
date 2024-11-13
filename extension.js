const vscode = require("vscode");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	console.log('Congratulations, your extension "MyVSC" is now active!');

	const disposable = vscode.commands.registerCommand(
		"my-first-extension.searchDotCodeProjects",
		async function () {
			const projectItems = await searchProjects("simple");
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
					await openProjectContent(selectedProject);
					vscode.window.showInformationMessage(
						`You have selected ${selectedProject.label}`
					);
					// opening the selected project in the dotcode website
					// vscode.env.openExternal(selectedProject.link);
				}

				console.log(selectedProject);
			}
		}
	);

	context.subscriptions.push(disposable);
}

async function searchProjects() {
	try {
		const res = await axios.get(`http://127.0.0.1:9000/api/v1/projects`);
		const projectItems = res.data.data.docs.map((project) => ({
			_id: project._id,
			lngName: project.lngName === "react" ? "javascript" : project.lngName,
			description: project.description,
			type: project.type,
			code: project.code,
			label: project.name,
			detail: `By: ${project.owner.name} | Stars: ${
				project.likes.length
			} | Comments: ${project.comments.length} | ${
				project.type === "ui"
					? "UI with HTML, CSS and JS"
					: project.lngName === "react"
					? "UI with REACT"
					: "Snippet with " + project.lngName
			} `,
			link: `http://localhost:5173/community/project/${project._id}`,
		}));

		return projectItems;
	} catch (err) {
		console.log("Error fetching projects from DotCode Database: ", err.message);
		vscode.window.showErrorMessage(
			"Failed to load projects from DotCode server😕"
		);
		return null;
	}
}

async function openProjectContent(project) {
	const isSnippet = project.type === "snippet";
	try {
		const document = await vscode.workspace.openTextDocument({
			content: isSnippet ? project.code.code : project.code.html,
			language: isSnippet ? project.lngName : "html",
		});

		await vscode.window.showTextDocument(document, { preview: false });
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to open project: ${error.message}`);
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
