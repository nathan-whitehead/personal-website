const markdownIt = require("markdown-it");
const markdownItTaskLists = require("markdown-it-task-lists");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTOC = require("markdown-it-table-of-contents");
const markdownItLinkAttributes = require("markdown-it-link-attributes");
const { full: markdownItEmoji } = require("markdown-it-emoji");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItDeflist = require("markdown-it-deflist");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAbbr = require("markdown-it-abbr");
const markdownItMultimdTable = require("markdown-it-multimd-table");
const markdownItContainer = require("markdown-it-container");
const markdownItMathJax = require("markdown-it-mathjax3");
const markdownItSub = require("markdown-it-sub");
const markdownItSup = require("markdown-it-sup");
const markdownItSpoiler = require("@traptitech/markdown-it-spoiler");

/**
 * Configure the markdown parser with syntax highlighting
 */
module.exports = async function (eleventyConfig) {
  // Configure markdown-it with syntax highlighting
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItTaskLists, {
      enabled: true,
      label: true,
      labelAfter: true,
    })
    .use(markdownItAnchor, {
      permalinkClass: "header-anchor",
      permalinkSymbol: "&sect;",
      permalinkBefore: true,
    })
    .use(markdownItTOC, {
      includeLevel: [1, 2, 3],
      containerClass: "toc",
      listType: "ol",
      // markerPattern: /^\[toc\]/,
    })
    .use(markdownItFootnote)
    // .use(markdownItFootnoteTooltips)
    .use(markdownItDeflist)
    .use(markdownItMultimdTable, {
      multiline: true,
      rowSpan: true,
      headerless: true,
      awidth: true, // For auto-width detection
    })
    .use(markdownItMathJax)
    .use(markdownItLinkAttributes, {
      pattern: /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)$/i,
      attrs: {
        target: "_blank",
        rel: "noopener noreferrer",
        class: "image-link",
      },
    })
    .use(markdownItEmoji)
    .use(markdownItAbbr)
    .use(markdownItAttrs)
    .use(markdownItContainer, "spoiler", {
      validate: function (params) {
        return params.trim().match(/^spoiler\s+(.*)$/);
      },
      render: function (tokens, idx) {
        const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          return `<details class="spoiler"><summary>${markdownLibrary.utils.escapeHtml(
            m[1]
          )}</summary>\n`;
        } else {
          return `</details>\n`;
        }
      },
    })
    .use(markdownItSub)
    .use(markdownItSup)
    .use(markdownItSpoiler);

  // Set the library
  eleventyConfig.setLibrary("md", markdownLibrary);
};
