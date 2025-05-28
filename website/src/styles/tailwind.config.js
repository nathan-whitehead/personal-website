/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      // You can add your custom theme extensions here
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              fontStyle: "normal",
              p: {
                margin: "0",
              },
            },
            h1: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: "500",
              borderBottom: `1px solid ${theme("colors.primary.400")}`,
              "html[data-theme='dark'] &": {
                borderBottomColor: theme("colors.primary.600"),
              },
            },
            h2: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: "400",
              borderBottom: `1px solid ${theme("colors.paper.400")}`,
              "html[data-theme='dark'] &": {
                borderBottomColor: theme("colors.zinc.700"),
              },
            },
            h3: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: "300",
            },
            a: {
              color: theme("colors.primary.500"),
              textDecoration: "none",
              'html[data-theme="dark"] &': {
                color: theme("colors.primary.400"),
              },
              "&:hover": {
                textDecoration: "underline",
                color: theme("colors.primary.600"),
                'html[data-theme="dark"] &': {
                  color: theme("colors.primary.500"),
                },
              },
            },
            ul: {
              li: {
                "&::marker": {
                  color: theme("colors.primary.500"),
                  'html[data-theme="dark"] &': {
                    color: theme("colors.primary.200"),
                  },
                },
              },
            },
            ol: {
              li: {
                "&::marker": {
                  color: theme("colors.primary.500"),
                  'html[data-theme="dark"] &': {
                    color: theme("colors.primary.200"),
                  },
                },
              },
            },
            "ul.contains-task-list": {
              listStyleType: "none",
              paddingLeft: theme("spacing.1"),

              li: {
                paddingLeft: theme("spacing.0"),

                // Remove default markers on task lists
                "&::marker": {
                  display: "none",
                  content: "none",
                },

                // Task list item spacing
                "&.task-list-item": {
                  marginTop: theme("spacing.1"),
                  marginBottom: theme("spacing.1"),
                  display: "flex",
                  alignItems: "flex-start",
                  gap: theme("spacing.2"),
                },

                // Custom styling for the checkbox
                'input[type="checkbox"]': {
                  appearance: "none",
                  width: "1.2em",
                  height: "1.2em",
                  marginTop: "0.25em",
                  border: `1px solid ${theme("colors.gray.400")}`,
                  borderRadius: theme("borderRadius.sm"),
                  backgroundColor: theme("colors.white"),
                  cursor: "pointer",
                  flexShrink: 0,

                  "&:checked": {
                    backgroundColor: theme("colors.primary.500"),
                    borderColor: theme("colors.primary.500"),
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E")`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  },

                  // Dark mode styling for checkbox
                  'html[data-theme="dark"] &': {
                    borderColor: theme("colors.gray.600"),
                    backgroundColor: theme("colors.gray.800"),

                    "&:checked": {
                      backgroundColor: theme("colors.primary.600"),
                      borderColor: theme("colors.primary.700"),
                    },
                  },
                },

                // Add strikethrough to completed items
                "&.task-list-item:has(input:checked) + p, &.task-list-item:has(input:checked)":
                  {
                    textDecoration: "line-through",
                    color: theme("colors.gray.500"),
                    'html[data-theme="dark"] &': {
                      color: theme("colors.gray.400"),
                    },
                  },
              },
            },
            // Style different levels of task lists
            "li.task-list-item ul.contains-task-list": {
              paddingLeft: theme("spacing.4"),
            },
            table: {
              margin: "2rem auto",
              width: "auto",
              maxWidth: "100%",
              display: "table",
              overflowX: "auto",
              borderCollapse: "separate",
              borderSpacing: 0,
              borderWidth: 0,

              // Optional: add a subtle shadow
              // boxShadow: theme("boxShadow.sm"),
              borderRadius: theme("borderRadius.md"),

              // Table caption
              caption: {
                marginBottom: theme("spacing.4"),
                color: theme("colors.stone.500"),
                fontSize: theme("fontSize.sm")[0],
                fontStyle: "italic",
              },

              // Column alignment - based on how Markdown parses alignment syntax
              "thead th:first-child:not([align]), tbody td:first-child:not([align])":
                {
                  textAlign: "left",
                },
              "th[align=center], td[align=center]": {
                textAlign: "center",
              },
              "th[align=right], td[align=right]": {
                textAlign: "right",
              },
              "th[align=left], td[align=left]": {
                textAlign: "left",
              },

              // Cell styling
              "td, th": {
                padding: "0" + " " + theme("spacing.2"),
                borderStyle: "none",
              },

              // Header styling
              thead: {
                // backgroundColor: theme("colors.paper.50"),
                // 'html[data-theme="dark"] &': {
                //   backgroundColor: theme("colors.zinc.800"),
                // },

                th: {
                  borderBottom: `1px solid currentColor`,

                  // No border radius for middle cells
                  "&:first-child": {
                    borderTopLeftRadius: theme("borderRadius.md"),
                  },
                  "&:last-child": {
                    borderTopRightRadius: theme("borderRadius.md"),
                  },
                },
              },

              // Body styling
              tbody: {
                // backgroundColor: theme("colors.paper.50"),
                // 'html[data-theme="dark"] &': {
                //   backgroundColor: theme("colors.zinc.800"),
                // },
                "tr:last-child": {
                  "td:first-child": {
                    borderBottomLeftRadius: theme("borderRadius.md"),
                  },
                  "td:last-child": {
                    borderBottomRightRadius: theme("borderRadius.md"),
                  },
                },
                // Hover effect
                "tr:hover": {
                  backgroundColor: theme("colors.paper.200"),
                  'html[data-theme="dark"] &': {
                    backgroundColor: theme("colors.zinc.700"),
                  },
                },
              },
            },
            hr: {
              borderColor: theme("colors.primary.700"),
              'html[data-theme="dark"] &': {
                borderColor: theme("colors.primary.200"),
              },
            },
            "h1, h2, h3": {
              position: "relative",
            },
            "p code, li code, td code": {
              backgroundColor: theme("colors.paper.200"),
              padding: "0 0.1rem",
              borderRadius: theme("borderRadius.sm"),
              fontSize: theme("fontSize.sm")[0],
              fontWeight: "400",
              fontFamily: theme("fontFamily.mono"),
              color: theme("colors.secondary.600"),
              'html[data-theme="dark"] &': {
                backgroundColor: theme("colors.zinc.800"),
                color: theme("colors.secondary.300"),
              },
              "&::before": {
                content: "none",
              },
              "&::after": {
                content: "none",
              },
            },
            "mjx-container": {},
          },
        },
      }),
    },
    plugins: [
      // Add @tailwindcss/typography if you've installed it
      require("@tailwindcss/typography"),
    ],
  },
};
