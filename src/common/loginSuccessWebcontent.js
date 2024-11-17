const htmlContent = `
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
				gap: 10rem;
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
				background-color: #5556;
				border-bottom: 2px solid transparent;
				color: #fff9;
				padding: 10px;
				font-size: 16px;
			}

			header button:hover {
				background-color: #555;
				color: #fff;
			}

			.success-box {
				display: flex;
				flex-direction: column;
				align-items: start;
				justify-content: center;
			}

			.success-box .name-box {
				color: #fff9;
				font-weight: bold;
				font-size: 1.6rem;
			}

			.success-box button {
				background: transparent;
				color: #858ef2;
				font-weight: bold;
				font-size: 1.6rem;
				text-transform: capitalize;
			}

			.success-box button:hover {
				text-decoration: underline;
				text-underline-offset: 5px;
			}

			.success-message {
				font-size: 1rem;
				color: #fff8;
				letter-spacing: 1px;
			}
			.success-note {
				font-size: 0.7rem;
				color: #fff6;
				letter-spacing: 0.5px;
				padding: 0.5rem 0rem;
				margin-top: 1rem;
				border-top: 1px solid #fff5;
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
		</style>
	</head>
	<body>
		<header>
			<a id="dotCodeLink">dot</a>
			<button id="profileBtnOne">User</button>
		</header>
		<div class="success-box">
			<div class="name-box">
				<span> Welcome, </span>
				<button id="profileBtnTwo">User</button>!
			</div>
			<span class="success-message">
				You have logged in successfully, have a nice snippeting time 👍🏻
			</span>
			<span class="success-note">
				This login session with end after a while.
			</span>
		</div>

		<script>
			document.addEventListener("DOMContentLoaded", () => {
				const vscode = acquireVsCodeApi();
				const profileBtn1 = document.getElementById("profileBtnOne");
				const profileBtn2 = document.getElementById("profileBtnTwo");
				const dotCodeLink = document.getElementById("dotCodeLink");

				window.addEventListener("message", (event) => {
					const user = event.data;
					profileBtn1.textContent = user.name;
					profileBtn2.textContent = user.name;
				});

				const openProfile = (event) => {
					event.preventDefault();
					vscode.postMessage({
						command: "openProfile",
					});
				};

				profileBtn1.addEventListener("click", openProfile);
				profileBtn2.addEventListener("click", openProfile);

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

const getLoginSuccessWebContent = () => htmlContent;

module.exports = getLoginSuccessWebContent;
