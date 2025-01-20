const vscode = require("vscode");
const axios = require("axios");

async function searchProjects(query) {
	try {
		const res = await axios.get(
			`http://127.0.0.1:9000/api/v1/search/projects?q=${query}`
		);

		if (res.data.results === 0) {
			return { results: res.data.results, projectItems: [] };
		} else if (res.data.results > 0) {
			const projectItems = formatIntoQuickPickItems(res.data.data.docs);
			return { results: projectItems.length, projectItems };
		}
	} catch (err) {
		vscode.window.showErrorMessage(
			"Failed to search projects from DotCode server😕 " + err.message
		);
		return null;
	}
}

function formatIntoQuickPickItems(projects) {
	const formattedItems = projects.map((project) => ({
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
		link: `https://unlikely-brina-sgc-6053c46d.koyeb.app/community/project/${project._id}`,
	}));

	return formattedItems;
}

module.exports = searchProjects;
