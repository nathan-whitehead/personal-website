import { visit } from "unist-util-visit";
export function rehypeHeadingGroup() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "element" &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)
      ) {
        node.properties.className = [
          ...(node.properties.className || []),
          "group",
        ];
      }
    });
  };
}
