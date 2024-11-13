const vscode = require("vscode");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */

async function searchProjects() {
	try {
		const res = await axios.get(`http://127.0.0.1:9000/api/v1/projects`);
		const projectItems = res.data.data.docs.map((project) => ({
			label: project.name,
			description: project.description,
			detail: `By: ${project.owner.name}, Stars: ${project.likes.length}, Comments: ${project.comments.length}`,
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
					vscode.window.showInformationMessage(
						`You have selected ${selectedProject.label}`
					);
					vscode.env.openExternal(selectedProject.link);
				}

				console.log(selectedProject);
			}
		}
	);

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
