export function transformerCodeMeta() {
  return {
    name: "code-meta-wrapper",
    code(node, options) {
      const lang = options.lang || "txt";

      const header = {
        type: "element",
        tagName: "div",
        properties: {
          className: [
            "code-header",
            "flex",
            "items-center",
            "justify-between",
            "px-3",
            "py-1",
            "text-xs",
            "font-mono",
          ],
        },
        children: [
          { type: "text", value: lang },
          {
            type: "element",
            tagName: "button",
            properties: {
              className: [
                "copy-button",
                "text-xs",
                "bg-zinc-300",
                "dark:bg-zinc-700",
                "rounded",
                "px-2",
                "py-0.5",
                "hover:bg-zinc-400",
                "dark:hover:bg-zinc-600",
              ],
              onclick:
                "navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText)",
            },
            children: [{ type: "text", value: "Copy" }],
          },
        ],
      };

      const pre = { ...node };
      node.tagName = "div";
      node.properties = {
        className: ["code-block-wrapper", "rounded", "overflow-hidden", "my-4"],
      };
      node.children = [header, pre];
    },
  };
}
