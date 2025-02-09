const vscode = require("vscode");
const validator = require("../../utils/validators");

async function openProjectContent(project) {
	const isSnippet = project.type === "snippet";
	try {
    if (!validator.isCodeEmpty(project)) {
      if (isSnippet) {
        const latestCode = project.code[0].code;
        const document = await vscode.workspace.openTextDocument({
          content: latestCode,
          language: project.lngName
        });

        await vscode.window.showTextDocument(document, { preview: false });
      } else {
        const latestCode = project.code[0];
        [
          { code: latestCode.html, lng: "html" },
          { code: latestCode.css, lng: "css" },
          { code: latestCode.js, lng: "javascript" }
        ].forEach(async (file) => {
          const document = await vscode.workspace.openTextDocument({
            content: file.code,
            language: file.lng
          });

          await vscode.window.showTextDocument(document, { preview: false });
        });
      }
    } else {
      vscode.window
        .showErrorMessage(
          "No code content to opne in new file",
          "Open in DotCode"
        )
        .then(async (selection) => {
          if (selection === "Open in DotCode") {
            vscode.env.openExternal(
              `http://localhost:5173/community/project/${project._id}`
            );
          }
        });
    }
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to open project: ${error.message}`);
	}
}

async function insertContentAtCursor(project) {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
    if (!validator.isCodeEmpty(project)) {
      const cursorPosition = editor.selection.active;

      if (project.type === "snippet") {
        const latestCode = latestCode[0].code;
        await editor.edit((editBuilder) =>
          editBuilder.insert(cursorPosition, latestCode)
        );
        vscode.window.showInformationMessage(
          `${
            project.lngName === "other" ? "" : project.lngName
          } Code inserted at you cursor position.`
        );
      } else {
        let language = editor.document.languageId;
        language =
          language === "javascript" ? "js" : editor.document.languageId;

        const latestCode = project.code[0];

        if (validator.isCurrLngModeUiLng(language)) {
          if (latestCode[language]) {
            await editor.edit((editBuilder) =>
              editBuilder.insert(cursorPosition, latestCode[language])
            );

            vscode.window.showInformationMessage(
              `${language.toUpperCase()} Code of selected UI inserted at you cursor position.`
            );
          } else {
            vscode.window
              .showErrorMessage(
                `Selected Ui component has no ${language} CONTENT.`,
                language !== "html" &&
                  latestCode.html.length > 0 &&
                  "Insert HTML",
                language !== "css" && latestCode.css.length > 0 && "Insert CSS",
                language !== "js" &&
                  latestCode.js.length > 0 &&
                  "Insert JavaScript"
              )
              .then(async (selection) => {
                if (selection === "Insert HTML") {
                  await editor.edit((editBuilder) =>
                    editBuilder.insert(cursorPosition, latestCode.html)
                  );

                  vscode.window.showInformationMessage(
                    `HTML Code of selected UI inserted at you cursor position.`
                  );
                } else if (selection === "Insert CSS") {
                  await editor.edit((editBuilder) =>
                    editBuilder.insert(cursorPosition, latestCode.css)
                  );

                  vscode.window.showInformationMessage(
                    `CSS Code of selected UI inserted at you cursor position.`
                  );
                } else if (selection === "Insert JavaScript") {
                  await editor.edit((editBuilder) =>
                    editBuilder.insert(cursorPosition, latestCode.js)
                  );

                  vscode.window.showInformationMessage(
                    `JavaScript Code of selected UI inserted at you cursor position.`
                  );
                }
              });
          }
        } else {
          vscode.window
            .showErrorMessage(
              `Your current language mode ${language.toUpperCase()} is not a UI language in DotCode, do you want still insert?`,
              "Insert HTML",
              "Insert CSS",
              "Insert JavaScript"
            )
            .then(async (selection) => {
              if (selection === "Insert HTML") {
                await editor.edit((editBuilder) =>
                  editBuilder.insert(cursorPosition, latestCode.html)
                );

                vscode.window.showInformationMessage(
                  `HTML Code of selected UI inserted at you cursor position.`
                );
              } else if (selection === "Insert CSS") {
                await editor.edit((editBuilder) =>
                  editBuilder.insert(cursorPosition, latestCode.css)
                );

                console.log("inserted code: ", latestCode.css);

                vscode.window.showInformationMessage(
                  `CSS Code of selected UI inserted at you cursor position.`
                );
              } else if (selection === "Insert JavaScript") {
                await editor.edit((editBuilder) =>
                  editBuilder.insert(cursorPosition, latestCode.js)
                );

                vscode.window.showInformationMessage(
                  `JavaScript Code of selected UI inserted at you cursor position.`
                );
              }
            });
        }
      }
    } else {
      vscode.window
        .showErrorMessage("No code content to insert", "Open in DotCode")
        .then(async (selection) => {
          if (selection === "Open in DotCode") {
            vscode.env.openExternal(
              `http://localhost:5173/community/project/${project._id}`
            );
          }
        });
    }
	} else {
		vscode.window.showErrorMessage(
			"No active editor found : Unable to access your cursor position"
		);
	}
}

function openInDotCode(project) {
	vscode.env.openExternal(project.link);
}

module.exports = { openProjectContent, insertContentAtCursor, openInDotCode };
