const axios = require("axios");
const vscode = require("vscode");

const handleLogin = async (data) => {
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
		console.log(response.data);
		vscode.window.showInformationMessage(
			`Logged in successfully! .... \n token: ${response.data.token}`
		);
		return;
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;

		vscode.window.showErrorMessage(`${message}, try again!`);
		return;
	}
};

module.exports = handleLogin;
