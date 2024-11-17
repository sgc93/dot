const userData = require("../utils/userData");

const axios = require("axios");
const vscode = require("vscode");

const handleLogin = async (data, context) => {
	try {
		vscode.window.showInformationMessage(
			`Loading .... \n Login with:- email: ${data.email}, password: ${data.password}`
		);
		const response = await axios.post(
			`http://127.0.0.1:9000/api/v1/users/login`,
			data,
			{
				withCredentials: true,
			}
		);
		const user = response.data.data.user;
		const token = response.data.token;
		userData.saveUserData(
			{
				name: user.name,
				userId: user._id,
				email: user.email,
				bio: user.bio,
				token,
			},
			context
		);
		vscode.window.showInformationMessage(
			`Welcome ${user.name}, You Have Logged In Successfully 👍🏻`
		);
		return;
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;

		vscode.window.showErrorMessage(`${message}`);
		return;
	}
};

module.exports = handleLogin;
