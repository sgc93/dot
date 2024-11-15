const fs = require("fs");
const path = require("path");

function getAuthWebContent(action) {
	const htmlPath = path.join(__dirname, "./authHtml.html");
	const cssPath = path.join(__dirname, "./authCss.css");

	const htmlContent = fs.readFileSync(htmlPath, "utf8");
	const cssContent = fs.readFileSync(cssPath, "utf8");

	return htmlContent.replace("{{style}}", `<style>${cssContent}</style>`);
}

module.exports = getAuthWebContent;
