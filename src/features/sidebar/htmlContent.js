function sideViewContent(isUserLoggedIn, user) {
	const name = isUserLoggedIn ? user.name : "Login";
	const email = isUserLoggedIn ? user.email : "";

	return `
  <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>DotCode Profile</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				padding: 0.3rem;
				display: flex;
				flex-direction: column;
				gap: 1rem;
			}

			body::-webkit-scrollbar {
				background-color: transparent;
				width: 9px;
			}
			body::-webkit-scrollbar-thumb {
				background-color: #5554;
				width: 9px;
				transition: all 0.3s;
			}
			body::-webkit-scrollbar-thumb:hover {
				background-color: #5558;
				width: 9px;
			}

			header {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0.5rem;
				padding: 0 0.5rem 0.5rem;
				border-bottom: 1px solid #5556;
				background: linear-gradient(to top, #5555, transparent);
			}

			header a {
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				width: 1.6rem;
				min-width: 1.5rem;
				height: 1.6rem;
				border-radius: 50%;
				border: 1px solid #858eff;
				font-size: 1rem;
				color: #858eff;

				transition: all 0.4s;
			}

			header a:hover {
				color: white;
				background-color: #858eff;
			}

			header button {
				border-radius: 0.5rem;
				padding: 0.4rem 0.6rem;
				color: #fff9;
				background-color: #5556;
				border-bottom: 2px solid transparent;
				font-size: 0.9rem;
			}

			header button:hover {
				color: #fff;
				background-color: #555;
			}

			header span {
				color: #fff9;
				line-clamp: 1;
				text-overflow: ellipsis;
			}

			.content-header {
				color: #fff8;
				padding-bottom: 0.5rem;
				font-size: 0.8rem;
				border-bottom: 1px solid #5556;
			}

			.content-box {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.content-box_data {
				display: flex;
				flex-direction: column;
				align-items: start;
				gap: 0.5rem;
				border: 1px solid #fff3;
				background-color: #fff1;
				padding: 0.5rem;
				border-radius: 0.3rem;

				cursor: pointer;
				transition: all 0.3s;
			}

			.content-box_data span:first-child {
				font-size: 1rem;
				font-weight: 600;
				color: #ffffffc4;
			}
			.content-box_data span:nth-child(2) {
				font-size: 0.8rem;
				font-weight: normal;
				color: #ffffff8d;
			}

			.content-box_data:hover {
				background-color: #fff2;
			}

			button {
				padding: 10px;
				font-size: 16px;
				color: white;
				font-weight: bold;
				font-size: 1.1rem;
				outline: none;
				border: none;

				cursor: pointer;
				transition: all 0.3s;
			}
		</style>
	</head>
	<body>
		<header>
			<a id="dotCodeLink">dot</a>
			<button id="accountBtn">${name}</button>
			<span id="emailSpan">${email}</span>
		</header>
		<div class="content-header">
			Explore <span style="color: #858eff; font-weight: bold">DotCode</span> to
			<span style="color: #dd710d; font-weight: 700">Create</span>,
			<span style="color: #1bd0c1; font-weight: 700">Store</span> and
			<span style="color: #a033f4; font-weight: 700">Reuse</span> Snippets
		</div>
		<div class="content-box">
			<div id="searchCommand" class="content-box_data">
				<span>DotCode: Search Projects</span>
				<span
					>Search and access publicly published projects from community</span
				>
			</div>
			<div id="projectsCommand" class="content-box_data">
				<span>DotCode: My Projects</span>
				<span>Access and manipulate your existed projects</span>
			</div>
			<div id="accountCommand" class="content-box_data">
				<span>DotCode: My Account</span>
				<span
					>Manage your DotCode account: logged in account, see detail, reset
					password, ...</span
				>
			</div>
			<div id="signupCommand" class="content-box_data">
				<span>DotCode: Sign Up</span>
				<span
					>Create new account here in vs with user friendly features and be
					ready to manage ui components and snippets</span
				>
			</div>
			<div id="loginCommand" class="content-box_data">
				<span>DotCode: Login</span>
				<span
					>Logged in with existed email and correct password, access your
					projects and add more from here</span
				>
			</div>
			<div id="createCommand" class="content-box_data">
				<span>DotCode: Create Project</span>
				<span
					>Select code from any active editor (tab) a pop up info message will
					appear automatically at bottom right</span
				>
			</div>
		</div>

		<script>
			document.addEventListener("DOMContentLoaded", () => {
				const vscode = acquireVsCodeApi();

				const dotCodeLink = document.getElementById("dotCodeLink");
				const accountBtn = document.getElementById("accountBtn");

				const searchCommand = document.getElementById("searchCommand");
				const projectsCommand = document.getElementById("projectsCommand");
				const accountCommand = document.getElementById("accountCommand");
				const signupCommand = document.getElementById("signupCommand");
				const loginCommand = document.getElementById("loginCommand");
				const createCommand = document.getElementById("createCommand");

				const goToAccount = (event) => {
					event.preventDefault();
					vscode.postMessage({
						command: "account",
					});
				};

				accountBtn.addEventListener("click", goToAccount);
				accountCommand.addEventListener("click", goToAccount);

				const goToCommand = (command) => {
					vscode.postMessage({
						command,
					});
				};

				projectsCommand.addEventListener("click", (event) => {
					event.preventDefault();
					goToCommand("projects");
				});

				searchCommand.addEventListener("click", (event) => {
					event.preventDefault();
					goToCommand("search");
				});

				signupCommand.addEventListener("click", (event) => {
					event.preventDefault();
					goToCommand("signup");
				});

				loginCommand.addEventListener("click", (event) => {
					event.preventDefault();
					goToCommand("login");
				});

				createCommand.addEventListener("click", (event) => {
					event.preventDefault();
					goToCommand("create");
				});

				dotCodeLink.addEventListener("click", (event) => {
					event.preventDefault();
					vscode.postMessage({
						command: "redirect",
						data: "https://unlikely-brina-sgc-6053c46d.koyeb.app",
					});
				});
			});
		</script>
	</body>
</html>
`;
}

module.exports = sideViewContent;
