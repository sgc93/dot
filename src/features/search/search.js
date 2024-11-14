const handleResults = require("./searchResults");
const searchProjects = require("../../api/projects");
const vscode = require("vscode");

async function search() {
	const query = await vscode.window.showInputBox({
		placeHolder: "Search projects here ...",
		prompt: "Search with project names, tags, descriptions, ...",
	});

	if (!query) {
		vscode.window.showErrorMessage("Search query cannot be EMPTY");
		return;
	} else {
		const searchResults = await searchProjects(query);
		if (searchResults.results > 0) {
			const selectedProject = await vscode.window.showQuickPick(
				searchResults.projectItems,
				{
					title: "DotCode Project Search Results",
					placeHolder: "Search Projects here ..",
				}
			);

			if (selectedProject === undefined) {
				vscode.window.showInformationMessage("No project is selected👍🏻");
			} else {
				handleResults.insertContentAtCursor(selectedProject);
				// handle inserting selected project code content at the current position of cursor
				// handle creating new file and show content of selected project
				// opening the selected project in the dotcode website
			}
		} else {
			vscode.window.showErrorMessage(
				`No result found for ${query}: try again with project name, description ro tags`
			);
			return;
		}
	}
}

module.exports = search;
