const fs = require("fs");
const path = require("path");

function getAuthWebContent(action) {
	const htmlPath = path.join(__dirname, "./authHtml.html");
	const cssPath = path.join(__dirname, "./authCss.css");

	const htmlContent = fs.readFileSync(htmlPath, "utf8");
	const cssContent = fs.readFileSync(cssPath, "utf8");
	if (action === "Sign Up") {
		const updatedHtml = htmlContent
			.replace("{{loginBtnInitClasses}}", "header-btn")
			.replace("{{signUpBtnInitClasses}}", "header-btn active")
			.replace("{{loginFormInitClasses}}", "hidden")
			.replace("{{signUpFormInitClasses}}", "shown");
		return updatedHtml.replace("{{style}}", `<style>${cssContent}</style>`);
	} else {
		const updatedHtml = htmlContent
			.replace("{{loginBtnInitClasses}}", "header-btn active")
			.replace("{{signUpBtnInitClasses}}", "header-btn")
			.replace("{{loginFormInitClasses}}", "shown")
			.replace("{{signUpFormInitClasses}}", "hidden");
		return updatedHtml.replace("{{style}}", `<style>${cssContent}</style>`);
	}
}

module.exports = getAuthWebContent;
