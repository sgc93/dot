const vscode = require("vscode");
const axios = require("axios");

async function getAllProjects() {
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

module.exports = getAllProjects;
