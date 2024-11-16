const vscode = require("vscode");

async function saveUserData(userData) {
	const secretStorage = vscode.workspace.getConfiguration();
	const expiry = 14 * 24 * 60 * 60 * 1000;
	await secretStorage.set("userData", JSON.stringify({ expiry, ...userData }));
}

async function getUserData() {
	const secretStorage = vscode.workspace.getConfiguration();
	const data = await secretStorage.get("userData");
	const parsedData = JSON.parse(data);

	if (parsedData && parsedData.expiry > Date.now()) {
		return parsedData;
	} else {
		await secretStorage.delete("userData");
		return null;
	}
}

async function deleteUserData() {
	const secretStorage = vscode.workspace.getConfiguration();
	await secretStorage.delete("userData");
}

module.exports = { saveUserData, getUserData, deleteUserData };
