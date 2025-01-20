const handleResults = require("./searchResults");
const searchProjects = require("../../api/projects");
const constants = require("../../utils/constants");
const vscode = require("vscode");

async function search() {
	const query = await vscode.window.showInputBox({
		placeHolder: "Search projects here ...",
		prompt: "Search with project names, tags, descriptions, ...",
	});

	if (!query) {
		vscode.window
			.showErrorMessage("Search query cannot be EMPTY", "Retry")
			.then((selection) => {
				if (selection === "Retry") {
					vscode.commands.executeCommand("dot-code.searchDotCodeProjects");
				}
			});
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
				const selectedAction = await vscode.window.showQuickPick(
					constants.searchResultActions,
					{
						title: `What to do with ${selectedProject.label}?`,
						placeHolder: "Search Action here ..",
					}
				);

				if (selectedAction === undefined) {
					vscode.window.showInformationMessage(
						`No Action is selected for '${selectedProject.label}'.`
					);
				} else {
					if (selectedAction.action === "insert") {
						handleResults.insertContentAtCursor(selectedProject);
					} else if (selectedAction.action === "open") {
						handleResults.openProjectContent(selectedProject);
					} else if (selectedAction.action === "redirect") {
						handleResults.openInDotCode(selectedProject);
					}
				}
			}
		} else {
			vscode.window
				.showErrorMessage(
					`No result found for ${query}: try again with project name, description ro tags`,
					"Retry",
					"Visit DotCode Web"
				)
				.then((selection) => {
					if (selection === "Retry") {
						vscode.commands.executeCommand("dot-code.searchDotCodeProjects");
					} else if (selection === "Visit DotCode Web") {
						vscode.env.openExternal(
              "https://unlikely-brina-sgc-6053c46d.koyeb.app/community"
            );
					}
				});
			return;
		}
	}
}

module.exports = search;
