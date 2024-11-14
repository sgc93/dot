const searchResultActions = [
	{
		action: "insert",
		label: "Insert",
		detail: "Insert in the active editor at cursor position",
	},
	{
		action: "open",
		label: "Open Project In New File",
		detail: "Open selected project in new Untitled file",
	},
	{
		action: "redirect",
		label: "Open Project In DotCode Website",
		detail: "Redirect to DotCode website and open selected project",
	},
];

module.exports = { searchResultActions };
