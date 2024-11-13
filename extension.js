const vscode = require("vscode");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */

async function searchProjects(query) {
	try {
		const res = await axios.get(
			`http://127.0.0.1:9000/api/v1/search/projects?q=simple`
		);
		const searchItems = res.data.data.docs.map((project) => ({
			label: project.name,
			description: project.description,
			detail: `By: ${project.owner.name}, Stars: ${project.likes.length}, Comments: ${project.comments.length}`,
		}));
		console.log(searchItems);

		return `${res.data.results} projects found for query '${query}'.`;
	} catch (err) {
		console.log(err);
		return `Error: ${err.message}`;
	}
}

function activate(context) {
	console.log('Congratulations, your extension "MyVSC" is now active!');

	const disposable = vscode.commands.registerCommand(
		"my-first-extension.searchDotCodeProjects",
		async function () {
			const projects = await searchProjects("simple");
			if (projects) {
				vscode.window.showInformationMessage(`You got ${projects} projects`);
				console.log("Projects fetched successfully:", projects);
			} else {
				vscode.window.showInformationMessage(
					"Error occurred while fetching projects"
				);
				console.log("Error occurred while fetching projects");
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
