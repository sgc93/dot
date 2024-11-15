const vscode = require("vscode");

class DotCodeWebViewProvider {
	constructor(context) {
		this.context = context;
	}

	resolveWebviewView(webviewView) {
		webviewView.webview.options = {
			enableScripts: true,
		};

		webviewView.webview.html = this.getHtmlContent(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(async (message) => {
			switch (message.command) {
				case "signIn":
					const username = await vscode.window.showInputBox({
						prompt: "Enter your username",
						placeHolder: "Your username",
					});
					const password = await vscode.window.showInputBox({
						prompt: "Enter your password",
						placeHolder: "Your password",
						password: true,
					});

					// Handle the username and password here
					console.log("Username:", username);
					console.log("Password:", password);
					break;

				case "signUp":
					// Similar implementation for sign-up
					break;
			}
		});
	}

	getHtmlContent() {
		return `
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>DotCode Sidebar</title>
       <style>
         body {
           font-family: Arial, sans-serif;
           padding: 10px;
         }
         button {
           display: block;
           margin: 10px 0;
           padding: 10px;
           width: 100%;
           font-size: 14px;
           cursor: pointer;
         }
       </style>
     </head>
     <body>
       <button id="signin">Sign In</button>
       <button id="signup">Sign Up</button>
       <script>
         const vscode = acquireVsCodeApi();
         document.getElementById('signin').addEventListener('click', () => {
           vscode.postMessage({ command: 'signIn' });
         });
         document.getElementById('signup').addEventListener('click', () => {
           vscode.postMessage({ command: 'signUp' });
         });
       </script>
     </body>
     </html>
   `;
	}
}

module.exports = DotCodeWebViewProvider;
