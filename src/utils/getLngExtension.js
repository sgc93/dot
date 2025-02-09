const  languages = [
  {
    extension: "html",
    lngName: "html",
  },
  {
    extension: "js",
    lngName: "js",
  },
  {
    extension: "css",
    lngName: "css",
  },
  {
    extension: "jsx",
    lngName: "react",
  },
  {
    extension: "java",
    lngName: "java",
  },
  {
    extension: "py",
    lngName: "python",
  },
  {
    extension: "go",
    lngName: "go",
  },
  {
    extension: "cs",
    lngName: "csharp",
  },
  {
    extension: "php",
    lngName: "php",
  },
  {
    extension: "swift",
    lngName: "swift",
  },
  {
    extension: "kt",
    lngName: "kotlin",
  },
  {
    extension: "rb",
    lngName: "ruby",
  },
  {
    extension: "rs",
    lngName: "rust",
  },
  {
    extension: "ts",
    lngName: "typescript",
  },
  {
    extension: "dot",
    lngName: "other",
  }
];

const getLngExtension = (lngName) => {
    let ext = '.txt';

    languages.forEach(lng => {
        if(lng.lngName === lngName){
            ext = lng.extension;
        }
    })

    return ext;
}

module.exports = getLngExtension;

