function saveUserData(userData, context) {
	const expiry = 14 * 24 * 60 * 60 * 1000;
	context.workspaceState.update(
		"userData",
		JSON.stringify({ expiry, ...userData })
	);
}

function getUserData(context) {
	const data = context.workspaceState.get("userData");
	const parsedData = JSON.parse(data);

	if (parsedData && parsedData.expiry > Date.now()) {
		return parsedData;
	} else {
		context.workspaceState.update("userData", undefined);
		return null;
	}
}

function deleteUserData(context) {
	context.workspaceState.update("userData", undefined);
}

module.exports = { saveUserData, getUserData, deleteUserData };
