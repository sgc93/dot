const vscode = require("vscode");
const axios = require("axios");

function formatIntoQuickPickItems(projects) {
  return projects.map((project) => {
    const pro = {
      _id: project._id,
      lngName: project.lngName === "react" ? "javascript" : project.lngName,
      description: project.description,
      type: project.type,
      code:
        project.code.length > 0
          ? project.code
          : [{ html: "", css: "", js: "" }],
      label: project.name,
      detail: `By: ${project.owner?.name ?? "Unknown"} | Stars: ${
        project.likes.length
      } | Comments: ${project.comments.length} | ${
        project.type === "ui"
          ? "UI with HTML, CSS and JS"
          : project.lngName === "react"
          ? "UI with REACT"
          : "Snippet with " + project.lngName
      } `,
      link: `https://dot-deploy-front-end1.vercel.app/community/project/${project._id}`
    };

    return pro;
  });
}

async function searchProjects(query) {
  try {
    const res = await axios.get(
      `https://unlikely-brina-sgc-6053c46d.koyeb.app/api/v1/search/projects?q=${query}`
    );

    if (res.data.results > 0) {
      const projectItems = formatIntoQuickPickItems(res.data.data.docs);
      return { results: projectItems.length, projectItems };
    } else {
      return { results: 0, projectItems: [] };
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      "Failed to search projects from DotCode server😕 " + err.message
    );
    return { results: 0, projectItems: [] };
  }
}

module.exports = searchProjects;
