const userData = require("../utils/userData");

const axios = require("axios");
const vscode = require("vscode");

const handleLogout = async (user, context) => {
	console.log(user);
	try {
		await axios.post(
			`http://127.0.0.1:9000/api/v1/users/logout`,
			{},
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
		);

		userData.deleteUserData(context);
		vscode.window.showInformationMessage(
			`You Have Logged Out Successfully, Hope you come back soon 👍🏻`
		);
		return true;
	} catch (error) {
		vscode.window.showErrorMessage(`Unable to logout, ${error.message}`);
		return false;
	}
};

module.exports = handleLogout;
