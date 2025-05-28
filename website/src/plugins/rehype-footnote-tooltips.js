import { visit } from "unist-util-visit";

export function rehypeFootnoteTooltips() {
  return (tree) => {
    const footnoteMap = new Map();

    // First pass: collect footnote definitions
    visit(tree, "element", (node) => {
      if (node.properties?.id?.startsWith("fn-")) {
        const key = node.properties.id.replace(/^fn-/, "");
        const value = node.children
          .map((child) => (child.type === "text" ? child.value : ""))
          .join(" ")
          .trim();
        footnoteMap.set(key, value);
      }
    });

    // Second pass: attach tooltip to references
    visit(tree, "element", (node) => {
      if (
        node.tagName === "sup" &&
        node.properties?.className?.includes("footnote-ref")
      ) {
        const anchor = node.children.find((c) => c.tagName === "a");
        const href = anchor?.properties?.href;
        const id = href?.replace("#fn-", "");
        const tooltip = footnoteMap.get(id);
        if (tooltip) {
          anchor.properties = {
            ...anchor.properties,
            title: tooltip,
            className: [
              ...(anchor.properties.className || []),
              "underline",
              "decoration-dotted",
              "cursor-help",
            ],
          };
        }
      }
    });
  };
}
