const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Get all JS files in this directory except this one
  const filterFiles = fs
    .readdirSync(__dirname)
    .filter((file) => file !== "index.js" && file.endsWith(".js"));

  // Load each file and register its exports as filters
  filterFiles.forEach((file) => {
    const filters = require(path.join(__dirname, file));
    const filterName = path.basename(file, ".js");

    if (typeof filters === "function") {
      // If the export is a single function
      eleventyConfig.addFilter(filterName, filters);
    } else {
      // If the export is an object with multiple functions
      Object.keys(filters).forEach((key) => {
        eleventyConfig.addFilter(key, filters[key]);
      });
    }
  });
};
