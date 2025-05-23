const sass = require("sass");
const path = require("path");
const yaml = require("js-yaml");

const markdownConfig = require("./src/_11ty/markdown");
const imageCarouselTransform = require("./src/_11ty/plugins/imageCarousel");
const registerFilters = require("./src/_filters/index");
const registerShortcodes = require("./src/_shortcodes/index");
const blogCollections = require("./src/_11ty/collections");
const librariesConfig = require("./src/_11ty/libraries");

module.exports = async function (eleventyConfig) {
  registerFilters(eleventyConfig);
  registerShortcodes(eleventyConfig);
  await markdownConfig(eleventyConfig);
  imageCarouselTransform(eleventyConfig);
  blogCollections(eleventyConfig);
  librariesConfig(eleventyConfig);

  // -------- libraries --------

  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      // Skip files that start with underscore
      const basename = path.basename(inputPath);
      if (basename.startsWith("_")) {
        return;
      }
      return async () => {
        const result = sass.compileString(inputContent, {
          loadPaths: [
            path.dirname(inputPath),
            "node_modules",
            "src/assets/scss",
          ],
          style: "compressed",
          quietDeps: true,
        });
        return result.css;
      };
    },
    getData: function (inputPath) {
      // set a permalink for SCSS files
      if (inputPath.endsWith("main.scss")) {
        return {
          permalink: "/assets/css/main.css",
        };
      }
    },
  });

  // Add YAML support
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // set custom dirs
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
