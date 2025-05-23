// | H1 | H2 | H3 |
// | - |:-| -: |
// | C1 | C23 ||
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt().use(require("markdown-it-multimd-table"));

const result = md.render(`
| A     | B       | C     |
| ----- | ------- | ----- |
| Cell1 | Spanning Cell   ||
`);

console.log(result);
