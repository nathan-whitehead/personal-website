module.exports = function (eleventyConfig) {
  // Create a dateFilter for formatting dates
  eleventyConfig.addFilter("dateFilter", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Collection for all blog posts, sorted by date
  eleventyConfig.addCollection("blogPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // Collection for recent posts (same as blogPosts but can be limited in templates)
  eleventyConfig.addCollection("recentPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // Collection for categories
  eleventyConfig.addCollection("categories", function (collectionApi) {
    const allPosts = collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .filter((post) => !post.data.draft);

    // Get all categories
    const categories = {};

    allPosts.forEach((post) => {
      const category = post.data.category || "Uncategorized";

      if (!categories[category]) {
        // Convert category name to slug
        const slug = category.toLowerCase().replace(/\s+/g, "-");

        categories[category] = {
          name: category,
          slug: slug,
          posts: [],
        };
      }

      categories[category].posts.push(post);
    });

    // Convert to array and sort by name
    return Object.values(categories).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  });
};
