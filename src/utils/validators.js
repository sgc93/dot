const isCurrLngModeSupported = (currLngMode) => {
	// check if the current lng mode is supported
};

const isCodeEmpty = (project) => {
  if (project.type === "ui") {
    if (
      project.code[0].html.trim().length === 0 &&
      project.code[0].css.trim().length === 0 &&
      project.code[0].js.trim().length === 0
    ) {
      return true;
    }
  } else {
    if (project.code[0].code.trim().length === 0) {
      return true;
    }
  }

  return false;
};

const isCurrLngModeUiLng = (currLngMode) => {
  if (currLngMode === "css" || currLngMode === "html" || currLngMode === "js") {
    return true;
  } else {
    return false;
  }
};

module.exports = { isCurrLngModeSupported, isCurrLngModeUiLng, isCodeEmpty };
