function getHtmlContent(state) {
	const formContent = `
    <h2>Login</h2>
    <form id="login-form">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
  `;

	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sidebar</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        h2 { text-align: center; }
        #form-container { padding: 10px; }
        input { width: 100%; padding: 8px; margin-bottom: 10px; }
        button { width: 100%; padding: 10px; }
        #project-list { margin-top: 20px; padding: 10px; }
        .project { padding: 8px; border: 1px solid #ccc; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div style="text-align: center; padding: 10px;">
        <button id="signUp-btn">Sign Up</button>
        <button id="login-btn">Login</button>
        <button id="forgotPassword-btn">Forgot Password</button>
        <button id="searchProject-btn">Search Project</button>
      </div>
      
      <div id="form-container">${formContent}</div>

      <script>
        const vscode = acquireVsCodeApi();

        // Handle button clicks
        document.getElementById("signUp-btn").addEventListener("click", () => {
          // Redirect to external sign-up page
          window.open('https://your-signup-page-url.com', '_blank');
        });

        document.getElementById("login-form")?.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          vscode.postMessage({ command: "login", email, password });
        });
      </script>
    </body>
    </html>
  `;
}
