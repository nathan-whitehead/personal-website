import { getCollection } from "astro:content";

export async function GET() {
  // Get all blog posts
  const allPosts = await getCollection("projects", ({ data }) => {
    // Filter out draft posts in production
    return import.meta.env.PROD ? !data.draft : true;
  });

  // Format date helper function
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Create search index
  const searchIndex = allPosts.map((post) => {
    return {
      title: post.data.title,
      description: post.data.description,
      category: post.data.category,
      date: formatDate(post.data.date),
      url: `/projects/${post.slug}/`,
      tags: post.data.tags || [],
      // Include excerpt of content for search
      content: post.body.slice(0, 1000),
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
