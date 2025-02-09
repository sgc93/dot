const vscode = require("vscode");
const axios = require("axios");

async function createProject(data, token) {
	try {
		vscode.window.showInformationMessage(`Creating snippet ... ${data.name}`);
		await axios.post(`https://unlikely-brina-sgc-6053c46d.koyeb.app/api/v1/projects`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

		vscode.window.showInformationMessage(
			`${data.name} is created successfully👍🏻`
		);

		return true;
	} catch (err) {
		vscode.window.showErrorMessage(
			"Failed to save this snippet😕" + err.message
		);
		return null;
	}
}

module.exports = createProject;
