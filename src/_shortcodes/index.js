const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  const shortcodeFiles = fs
    .readdirSync(__dirname)
    .filter((file) => file !== "index.js" && file.endsWith(".js"));

  shortcodeFiles.forEach((file) => {
    const shortcodes = require(path.join(__dirname, file));

    Object.keys(shortcodes).forEach((key) => {
      // Register each as a shortcode
      eleventyConfig.addShortcode(key, shortcodes[key]);
    });
  });
};
