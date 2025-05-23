module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("imageCarousel", function (content, outputPath) {
    // Only process HTML files
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    // console.log("Processing HTML file for carousels:", outputPath);

    // Regular expression to find consecutive images in a paragraph
    // This matches <p> tags containing multiple <img> tags with optional <br> between them
    const carouselRegex = /<p>(\s*<img[^>]+>\s*(?:<br>?\s*)?){2,}<\/p>/g;

    return content.replace(carouselRegex, function (match) {
      // console.log("Found potential carousel:", match);

      // Extract all img tags
      const imgRegex = /<img[^>]+>/g;
      const images = match.match(imgRegex);

      if (!images || images.length <= 1) {
        return match;
      }

      console.log(`Creating carousel with ${images.length} images`);

      // Extract title/alt from each image for captions
      const processedImages = images.map((img) => {
        const titleMatch = img.match(/title="([^"]+)"/);
        const altMatch = img.match(/alt="([^"]+)"/);
        const title = titleMatch ? titleMatch[1] : "";

        return {
          html: img,
          title: title,
        };
      });

      // Create carousel HTML
      return `
        <div class="image-carousel">
          <div class="splide">
            <div class="splide__track">
              <ul class="splide__list">
                ${processedImages
                  .map(
                    (img) => `
                  <li class="splide__slide">
                    <figure>
                      ${img.html.replace(/\s+class="[^"]*"/, "")}
                      ${
                        img.title ? `<figcaption>${img.title}</figcaption>` : ""
                      }
                    </figure>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
    });
  });
};
