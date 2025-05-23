const md = require("markdown-it")().use(require("markdown-it-footnote"));

const tooltipRules = {
  footnote_ref: [
    '<sup class="footnote-ref">',
    '<sup class="footnote-ref has-tooltip">',
  ],
};

md.renderer.rules.footnote_ref = () => {
  '<sup class="footnote-ref">';
};
