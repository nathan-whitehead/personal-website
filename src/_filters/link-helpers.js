module.exports = {
  getLink: function (links, name) {
    if (!links) return "";
    const link = links.find((link) => link.name === name);
    return link ? link.url : "";
  },
  getShortLink: function (links, name) {
    if (!links) return "";
    const link = links.find((link) => link.name === name);
    return link ? link.shortUrl : "";
  },

  // You can add related functions here
  getAllLinkNames: function (links) {
    if (!links) return [];
    return links.map((link) => link.name);
  },
  stripTags: function (str) {
    return str.replace(/<[^>]*>/g, "");
  },
};
