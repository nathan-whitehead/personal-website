import { visit } from "unist-util-visit";

export function remarkSupSub() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || !node.value) return;

      // Match superscript pattern X^2^ and subscript pattern H~2~O
      const supSubPattern = /(\^([^\^]+)\^)|(~([^~]+)~)/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      let hasMatches = false;

      // Process all matches in this text node
      while ((match = supSubPattern.exec(node.value)) !== null) {
        hasMatches = true;

        // Add text before the match
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // Check if it's superscript (^...^) or subscript (~...~)
        if (match[1]) {
          // It's superscript
          parts.push({
            type: "element",
            tagName: "sup",
            properties: {},
            children: [{ type: "text", value: match[2] }],
          });
        } else if (match[3]) {
          // It's subscript
          parts.push({
            type: "element",
            tagName: "sub",
            properties: {},
            children: [{ type: "text", value: match[4] }],
          });
        }

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after the last match
      if (hasMatches && lastIndex < node.value.length) {
        parts.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      // Replace the node with our parsed parts if we found matches
      if (hasMatches && parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
        return index + parts.length; // Skip over the nodes we just inserted
      }
    });
  };
}
