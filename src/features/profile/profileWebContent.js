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
			.replace("{{logoutBtnInitClass}}", "header-btn")
			.replace("{{projectBtnInitClass}}", "header-btn")
			.replace("{{accountBoxInitClass}}", "content-box_data shown")
			.replace("{{logoutBoxInitClass}}", "content-box_data hidden")
			.replace("{{profileBoxInitClass}}", "content-box_data hidden")
			.replace("{{projectBoxInitClass}}", "project-content_box hidden");
		return updatedHtml.replace("{{style}}", `<style>${cssContent}</style>`);
	} else if (action === "Projects") {
		const updatedHtml = htmlContent
			.replace("{{accountBtnInitClass}}", "header-btn")
			.replace("{{profileBtnInitClass}}", "header-btn")
			.replace("{{logoutBtnInitClass}}", "header-btn")
			.replace("{{projectBtnInitClass}}", "header-btn active")
			.replace("{{accountBoxInitClass}}", "content-box_data hidden")
			.replace("{{logoutBoxInitClass}}", "content-box_data hidden")
			.replace("{{profileBoxInitClass}}", "content-box_data hidden")
			.replace("{{projectBoxInitClass}}", "project-content_box shown");
		return updatedHtml.replace("{{style}}", `<style>${cssContent}</style>`);
	} else if (action === "Log Out") {
		const updatedHtml = htmlContent
			.replace("{{accountBtnInitClass}}", "header-btn")
			.replace("{{profileBtnInitClass}}", "header-btn")
			.replace("{{projectBtnInitClass}}", "header-btn")
			.replace("{{logoutBtnInitClass}}", "header-btn active")
			.replace("{{accountBoxInitClass}}", "content-box_data hidden")
			.replace("{{logoutBoxInitClass}}", "content-box_data shown")
			.replace("{{profileBoxInitClass}}", "content-box_data hidden")
			.replace("{{projectBoxInitClass}}", "project-content_box hidden");
		return updatedHtml.replace("{{style}}", `<style>${cssContent}</style>`);
	}
}

module.exports = getProfileWebContent;
