/**
 * Configure external libraries and their assets
 */
module.exports = function (eleventyConfig) {
  // Library passthrough - entire directories
  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap/dist": "assets/libraries/bootstrap",
    "node_modules/bootstrap-icons": "assets/libraries/bootstrap-icons",
    "node_modules/prismjs": "assets/libraries/prismjs",
    "node_modules/@splidejs/splide": "assets/libraries/splide",
  });
  // eleventyConfig.addPlugin(require("./plugins/shiki.js"), {
  //   theme: "dark-plus",
  // });

  console.log("Library assets configured for passthrough");
};
