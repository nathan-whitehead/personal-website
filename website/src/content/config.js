import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  contentType: "mdx",
  schema: ({ image }) => {
    const imageSchema = z.object({
      src: image(),
      alt: z.string().optional(),
    });

    return z
      .object({
        title: z.string(),
        date: z.date(),
        category: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional().default(false),
        thumbnail: imageSchema.optional(),
        cover: imageSchema.optional(),
      })
      .transform((data) => {
        //if no thumbnail but has cover, set use thumbnail as cover
        if (!data.thumbnail && data.cover) {
          data.thumbnail = data.cover;
        }
        return data;
      });
  },
});

export const collections = {
  blog: blogCollection,
};
