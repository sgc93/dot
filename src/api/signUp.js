const userData = require("../utils/userData");

const axios = require("axios");
const vscode = require("vscode");

const handleSignUP = async (data, context) => {
	try {
		vscode.window.showInformationMessage(`${data.name} signing up ...`);
		const response = await axios.post(
      `https://unlikely-brina-sgc-6053c46d.koyeb.app/api/v1/users/signup`,
      data,
      {
        withCredentials: true
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
			`Welcome ${user.name}, You Have Signed Up Successfully 👍🏻`
		);
		return true;
	} catch (error) {
		vscode.window.showErrorMessage(`Unable to signing Up, ${error.message}`);
		return false;
	}
};

module.exports = handleSignUP;
