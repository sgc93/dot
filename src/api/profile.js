const vscode = require("vscode");
const axios = require("axios");

async function getMyProjects(token) {
	try {
		const res = await axios.get(`http://127.0.0.1:9000/api/v1/users/me`, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.data.data.doc.projects.length === 0) {
			return [];
		} else if (res.data.data.doc.projects.length > 0) {
			const projects = res.data.data.doc.projects;
			return projects;
		}
	} catch (err) {
		console.log(err.message);
		vscode.window.showErrorMessage(
			"Failed to fetch your projects from DotCode server😕"
		);
		return null;
	}
}

module.exports = getMyProjects;
