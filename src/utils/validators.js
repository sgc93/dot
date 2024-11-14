const isCurrLngModeSupported = (currLngMode) => {
	// check if the current lng mode is supported
};

const isCurrLngModeUiLng = (currLngMode) => {
	if (currLngMode === "css" || currLngMode === "html" || currLngMode === "js") {
		return true;
	} else {
		return false;
	}
};

module.exports = { isCurrLngModeSupported, isCurrLngModeUiLng };
