function getWebviewContent(code, languageId) {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Snippet</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.css" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${languageId}.min.js"></script>
  <style>
    pre {
      background: #2d2d2d;
      color: #ffffff;
      padding: 10px;
      border-radius: 5px;
      overflow: auto;
    }
  </style>
</head>
<body>
  <h1>Selected Code:</h1>
  <pre><code class="language-${languageId}">${code
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")}</code></pre>
  <script>
    Prism.highlightAll();
  </script>
</body>
</html>`;
}

module.exports = getWebviewContent;
