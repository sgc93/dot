const fs = require("fs");
const path = require("path");

function getProfileWebContent(action) {
	const htmlPath = path.join(__dirname, "./profileHtml.html");
	const cssPath = path.join(__dirname, "./profileCss.css");

	const htmlContent = fs.readFileSync(htmlPath, "utf8");
	const cssContent = fs.readFileSync(cssPath, "utf8");

	if (action === "Account") {
		const updatedHtml = htmlContent
			.replace("{{accountBtnInitClass}}", "header-btn active")
			.replace("{{profileBtnInitClass}}", "header-btn")
			.replace("{{logoutBtnInitClass}}", "header-btn");
		return updatedHtml.replace("{{style}}", `<style>${cssContent}</style>`);
	} else {
		const updatedHtml = htmlContent
			.replace("{{accountBtnInitClass}}", "header-btn")
			.replace("{{profileBtnInitClass}}", "header-btn")
			.replace("{{logoutBtnInitClass}}", "header-btn active");
		return updatedHtml.replace("{{style}}", `<style>${cssContent}</style>`);
	}
}

module.exports = getProfileWebContent;
