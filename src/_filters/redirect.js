module.exports = {
  // Redirect filter for Eleventy
  eleventyRedirect: function (url) {
    if (this.page && this.page.url && this.page.redirect) {
      return `
        <meta http-equiv="refresh" content="0; url=${this.page.redirect}">
        <script>window.location.href="${this.page.redirect}"</script>
      `;
    }
    return "";
  },
};
