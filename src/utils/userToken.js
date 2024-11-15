const vscode = require("vscode");

async function saveToken(token) {
	const secretStorage = vscode.workspace.getConfiguration();
	const expiry = 14 * 24 * 60 * 60 * 1000;
	await secretStorage.set("jwt", JSON.stringify({ expiry, token }));
}

async function getToken() {
	const secretStorage = vscode.workspace.getConfiguration();
	const jwt = await secretStorage.get("jwt");
	const parsedJwt = JSON.parse(jwt);

	if (parsedJwt && parsedJwt.expiry > Date.now()) {
		return parsedJwt.token;
	} else {
		await secretStorage.delete("jwt");
		return null;
	}
}

async function deleteToken() {
	const secretStorage = vscode.workspace.getConfiguration();
	await secretStorage.delete("jwt");
}

module.exports = { saveToken, getToken, deleteToken };
