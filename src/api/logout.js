const userData = require("../utils/userData");

const axios = require("axios");
const vscode = require("vscode");

const handleLogout = async (user, context) => {
	console.log(user);
		userData.deleteUserData(context);

    try {
      await axios.post(
        `https://unlikely-brina-sgc-6053c46d.koyeb.app/api/v1/users/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      userData.deleteUserData(context);
      vscode.window.showInformationMessage(
        `You Have Logged Out Successfully, Hope you come back soon 👍🏻`
      );
      return true;
    } catch (error) {
      console.log(error);
      vscode.window.showErrorMessage(`Unable to logout, ${error.message}`);
      return false;
    }
};

module.exports = handleLogout;
