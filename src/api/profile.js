const vscode = require("vscode");
const axios = require("axios");

async function getMyProjects(token) {
	try {
		const res = await axios.get(
      `https://unlikely-brina-sgc-6053c46d.koyeb.app/api/v1/users/me`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

		if (res.data.data.doc.projects.length === 0) {
			return [];
		} else if (res.data.data.doc.projects.length > 0) {
			const projects = res.data.data.doc.projects.reverse();
			return projects;
		}
	} catch (err) {
		vscode.window.showErrorMessage(
			"Failed to fetch your projects from DotCode server😕" + err.message
		);
		return null;
	}
}

module.exports = getMyProjects;
