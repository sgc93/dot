function saveUserData(userData, context) {
	const expiry = Date.now() + 14 * 24 * 60 * 60 * 1000;
	const loggedInAt = Date.now();

	context.workspaceState.update(
		"userData",
		JSON.stringify({ expiry, loggedInAt, ...userData })
	);
}

function getUserData(context) {
	const data = context.workspaceState.get("userData");
	if (!data) {
		return null;
	}

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
