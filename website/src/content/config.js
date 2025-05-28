import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  contentType: "mdx",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      category: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional().default(false),
      thumbnail: z
        .object({
          src: image(),
          alt: z.string().optional(),
        })
        .optional(),
      cover: z
        .object({
          src: image(),
          alt: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
