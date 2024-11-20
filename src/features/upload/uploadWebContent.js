function getWebviewContent(code, languageId, isCreated, data) {
	const initialCode = isCreated ? data.code.code : code;
	return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>DotCode Login</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				margin: 2rem;
				display: flex;
				align-items: center;
				flex-direction: column;
				gap: 1rem;
				background-color: #2d2c2c;
			}

			header {
				display: flex;
				align-items: center;
				align-self: flex-start;
				gap: 0.3rem;
			}

			header a {
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				width: 2.2rem;
				height: 2.2rem;
				border-radius: 50%;
				border: 2px solid #858eff;
				margin-right: 0.6rem;
				font-size: 1rem;
				color: #858eff;

				transition: all 0.4s;
			}

			header a:hover {
				color: white;
				background-color: #858eff;
			}

			header button {
				border-radius: 0.2rem;
				padding: 0.5rem 1rem;
				background-color: ${isCreated ? "#028702a3" : "#5556"};
				border-bottom: 2px solid transparent;
				color: #efebeb;
				padding: 10px;
				font-size: 16px;
			}

			.about-box {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				height: 84dvh;
				width: 90%;
				margin-left: 2rem;
				border-radius: 0.3rem;
			}

			.code-box {
				height: 54dvh;
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
			}

			.code-box_header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;
			}

			.code-box_header span {
				color: #fff9;
				font-weight: bold;
			}

			.code-box_header span #lngName {
				color: #fc810f;
			}
			.code-box_header button {
				border-radius: 0.2rem;
				padding: 0.5rem 1rem;
				background-color: #5556;
				border-bottom: 2px solid transparent;
				color: #fff9;
				padding: 0.3rem 0.6rem;
				font-weight: bold;
				font-size: 0.8rem;
				text-transform: capitalize;
			}

			.code-box_header button:hover {
				background-color: #555;
				color: #fff;
			}

			pre {
				height: 45dvh;
				background: #5556;
				color: #a9aac8;
				border-radius: 0.3rem;

				max-height: 50dvh;
				font-size: large;
				overflow-y: scroll;
				padding: 0.5rem;
			}

			pre::-webkit-scrollbar {
				background-color: transparent;
				width: 10px;
			}

			pre::-webkit-scrollbar-thumb {
				border-radius: 1rem;
				background-color: #555;
				width: 10px;
			}

			.data-box {
				width: 100%;

				align-self: flex-start;
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 2rem;
			}

			.data-box_header {
				width: 100%;
				display: flex;
				align-items: center;
				gap: 1rem;
			}

			.divider {
				height: 2px;
				flex-grow: 1;
				background: linear-gradient(to right, #fff4, transparent);
				margin: 0.7rem 0rem;
			}

			.data-box_header span {
				font-weight: bold;
				border-radius: 0.3rem;
				color: #fff9;
			}

			.form {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.5rem;
				padding: 0 1rem;
			}

			.form div {
				display: flex;
				align-items: start;
				gap: 0.5rem;
			}

			input {
				padding: 8px;
				font-size: 16px;
				border-radius: 0.4rem;

				font-size: 1.2rem;
				font-weight: bold;
				color: #fff;

				background-color: #555;
				border: 2px solid #555;
				outline: none;

				transition: all 0.3s;
			}

			input:focus {
				border-color: #999;
			}

			input::placeholder {
				color: #fff9;
				font-size: 1rem;
			}

			label {
				font-weight: bold;
				color: #ffff;
			}

			.form button {
				background-color: rgba(133, 141, 255, 0.8);
				padding: 0.7rem 1.2rem;
				border-radius: 0.3rem;
				margin-top: 1rem;
			}

			.form button:hover {
				background-color: #858eff;
			}

			.error-box {
				color: red !important;
				font-size: 0.9rem;
				font-weight: normal !important;
				padding: 0 0.5rem;
			}

			button {
				color: white;
				font-weight: bold;
				font-size: 1.1rem;
				outline: none;
				border: none;

				cursor: pointer;
				transition: all 0.3s;
			}

			.not-seen {
				display: none;
			}
		</style>
	</head>
	<body>
		<header>
			<a id="dotCodeLink">dot</a>
			<button>${
				isCreated
					? `${data.name} is created successfully!`
					: "Creating Code Snippet"
			}</button>
		</header>
		<div class="about-box">
			<div class="code-box_header">
				<span>
					<span>Code Snippet with </span>
					<input type="text" placeholder="Language Name" value="${languageId}" id="lngName" />
				</span>
				<button id="hideCodeBtn">hide code</button>
			</div>
			<div id="codeBox" class="code-box">
				<pre contenteditable="true"  id="codeField">${initialCode
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")}</pre>
			</div>
			<div class="data-box">
				<div class="data-box_header">
					<span>Add metadata: </span>
					<div class="divider"></div>
					<span class="error-box not-seen" id="errorBox">No error</span>
				</div>
				<div class="form">
					<div>
						<input type="text" id="projectName" placeholder="Project name" value="${
							isCreated ? data.name : ""
						}"/>
						<input type="text" id="projectDesc" placeholder=" Description"  value="${
							isCreated ? data.description : ""
						}"/>
					</div>
					<div>
						<input
							type="text"
							id="projectTags"
							placeholder="Tags (space them)"
							value="${isCreated ? (data.tags ? data.tags.join(" ") : "") : ""}"
						/>
						<input
							type="text"
							id="projectVisibility"
							placeholder="Visibility (public / private)"  value="${
								isCreated ? data.visibility : ""
							}"
						/>
					</div>
					<button id="createBtn">Create Project</button>
				</div>
			</div>
		</div>

		<script>
			document.addEventListener("DOMContentLoaded", () => {
				const vscode = acquireVsCodeApi();
				const codeField = document.getElementById("codeField");
				const fields = Array.from(document.getElementsByTagName("input"));
				const dotCodeLink = document.getElementById("dotCodeLink");

				const langName = document.getElementById("lngName");
				const hideCodeBtn = document.getElementById("hideCodeBtn");
				const errorBox = document.getElementById("errorBox");
				const codeBox = document.getElementById("codeBox");

				const nameField = document.getElementById("projectName");
				const descField = document.getElementById("projectDesc");
				const tagsField = document.getElementById("projectTags");
				const visibilityFiled = document.getElementById("projectVisibility");
				const createBtn = document.getElementById("createBtn");

				window.addEventListener("message", (event) => {
					const user = event.data;
					profileBtn1.textContent = user.name;
					profileBtn2.textContent = user.name;
				});

				hideCodeBtn.addEventListener("click", (event) => {
					event.preventDefault();
					const currText = hideCodeBtn.textContent;
					if (currText === "hide code") {
						hideCodeBtn.textContent = "show code";
						codeBox.classList.add("not-seen");
					} else {
						hideCodeBtn.textContent = "hide code";
						codeBox.classList.remove("not-seen");
					}
				});

				const isEmpty = (value) => {
					return value.length === 0;
				};

				const validateCode = (code) => {
					if (isEmpty(code)) {
						errorBox.classList.remove("not-seen");
						errorBox.innerHTML = "Project should have code content";
						return false;
					} else {
						return true;
					}
				};
				const validateLngName = (lngName) => {
					if (isEmpty(lngName)) {
						errorBox.classList.remove("not-seen");
						errorBox.innerHTML = "Specify the snippet language please, at the top 👆🏻";
						return false;
					} else {
						return true;
					}
				};

				const isValidProjectName = (name) => {
					return name.length >= 3;
				};

				const validateProjectName = (name) => {
					if (isEmpty(name)) {
						errorBox.classList.remove("not-seen");
						errorBox.innerHTML = "Project should have name";
						return false;
					} else {
						if (!isValidProjectName(name)) {
							errorBox.classList.remove("not-seen");
							errorBox.innerHTML =
								"Project name must contain at least 3 characters";
							return false;
						} else {
							return true;
						}
					}
				};

				const isValidVisibility = (visibility) => {
					return (
						visibility.toLocaleLowerCase() === "public" ||
						visibility.toLocaleLowerCase() === "private"
					);
				};

				const validateProjectVisibility = (visibility) => {
					if (isEmpty(visibility)) {
						errorBox.classList.remove("not-seen");
						errorBox.innerHTML = "Please enter project's visibility";
						return false;
					} else {
						if (!isValidVisibility(visibility)) {
							errorBox.classList.remove("not-seen");
							errorBox.innerHTML =
								"Invalid visibility: it must be either public or private";
							return false;
						} else {
							return true;
						}
					}
				};

				// clear validation error as soon as user focus a field
				fields.forEach((field) => {
					field.addEventListener("keyup", () => {
						if (!errorBox.classList.contains("not-seen")) {
							errorBox.classList.add("not-seen");
							errorBox.innerHTML = "No Error: ";
						}
					});
				});

				const parseTags = (tags) => {
					if (tags.trim()) {
						const splittedTags = tags.split(" ");
						const filteredTags = splittedTags.filter(
							(tag) => tag.trim().length > 0
						);
						return filteredTags;
					}
				};

				// handle creating project
				createBtn.addEventListener("click", (event) => {
					event.preventDefault();
					const name = nameField.value;
					const description = descField.value;
					const tags = tagsField.value;
					const visibility = visibilityFiled.value;
					const code = codeField.textContent;
					const lngName = langName.value;
					if (validateCode(code)) {
						if(validateLngName(lngName)){
							if (validateProjectName(name)) {
								if (validateProjectVisibility(visibility)) {
									const data = {
										name,
										lngName,
										description,
										tags: parseTags(tags),
										visibility: visibility,
										code: { code },
									};
									vscode.postMessage({
										command: "createProject",
										data: data,
									});
								}
							}
						}
					}
				});

				dotCodeLink.addEventListener("click", (event) => {
					event.preventDefault();
					vscode.postMessage({
						command: "redirect",
						data: "http://localhost:5173",
					});
				});
			});
		</script>
	</body>
</html>
`;
}

module.exports = getWebviewContent;
