// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

import rehypeMathJax from "rehype-mathjax";
import rehypeKatex from "rehype-katex";
import { rehypeHeadingGroup } from "./src/plugins/rehype-heading-group.js";
import { rehypeFootnoteTooltips } from "./src/plugins/rehype-footnote-tooltips.js";

import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import { transformerNotationDiff } from "@shikijs/transformers";
import { transformerCodeMeta } from "./src/plugins/shiki-transformer-code-meta.js";

import icon from "astro-icon";

// import { remarkSupSub } from "./src/plugins/remark-supersub.js";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    vue(),
    mdx({
      remarkPlugins: [remarkEmoji, remarkGfm, remarkMath],
      rehypePlugins: [
        // rehypeMathJax,
        rehypeKatex,
        rehypeSlug,
        rehypeHeadingGroup,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "prepend",
            properties: {
              className: [
                "anchor-link",
                "absolute",
                "right-full", // Align with right edge of heading
                "top-1/2",
                "-translate-y-1/2", // Vertically center
                "text-right",
                "opacity-0",
                "group-hover:opacity-100",
                "transition-opacity",
                "text-paper-500",
                "dark:text-zinc-600",
                "hover:scale-110",
                "hover:text-primary-200",
                "hover:dark:text-primary-400",
                "transform",
                "duration-200",
                "px-1",
                "hover:no-underline",
              ],
              "aria-hidden": "true",
            },
            content: {
              type: "element",
              tagName: "span",
              properties: {
                className: [
                  "anchor-symbol",
                  "text-md",
                  "block",
                  "w-full",
                  "text-center",
                  "font-script",
                ],
              },
              children: [{ type: "text", value: "§" }],
            },
          },
        ],
        // rehypeFootnoteTooltips,
      ],
    }),
    icon({
      include: {
        mdi: ["*"],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      },
    },
  },

  markdown: {
    shikiConfig: {
      themes: { dark: "plastic", light: "monokai" },
      wrap: true,
      transformers: [
        transformerColorizedBrackets(),
        //transformerCodeMeta()
      ],
    },
    remarkPlugins: [remarkGfm, remarkEmoji],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: {
            className: [
              "anchor-link",
              "absolute",
              "right-full", // Align with right edge of heading
              "top-1/2",
              "-translate-y-1/2", // Vertically center
              "text-right",
              "opacity-0",
              "group-hover:opacity-100",
              "transition-opacity",
              "text-paper-500",
              "dark:text-zinc-600",
              "hover:scale-110",
              "hover:text-primary-200",
              "hover:dark:text-primary-400",
              "transform",
              "duration-200",
              "px-1",
              "hover:no-underline",
            ],
            "aria-hidden": "true",
          },
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: [
                "anchor-symbol",
                "text-md",
                "block",
                "w-full",
                "text-center",
                "font-script",
              ],
            },
            children: [{ type: "text", value: "§" }],
          },
        },
      ],
    ],
  },

  redirects: {
    "/contact": "/about/contact",
    "/projects": "/under-construction",
  },
  prefetch: true,
});
