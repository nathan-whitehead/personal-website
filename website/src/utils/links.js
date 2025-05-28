/**
 * Get a specific link URL by name from an array of link objects
 * @param {Array} links - Array of link objects with name and url properties
 * @param {string} name - Name of the link to find
 * @returns {string} The URL of the requested link or '#' if not found
 */
export function getLink(links, name) {
  if (!links || !Array.isArray(links)) {
    return "#";
  }

  const link = links.find((link) => link.name === name);
  return link ? link.url : "#";
}

/**
 * Get a shortened link display name from a list of links
 * @param {Array} links - Array of link objects
 * @param {string} name - Name of the link to find
 * @returns {string} The display name of the link or the name itself if not found
 */
export function getShortLink(links, name) {
  if (!links || !Array.isArray(links)) {
    return name;
  }

  const link = links.find((link) => {
    if (link.name) return link.name === name;

    if (link.shortUrl)
      return link.shortUrl.toLowerCase().includes(name.toLowerCase());
    if (link.url) return link.url.toLowerCase().includes(name.toLowerCase());

    return false;
  });

  if (link) {
    if (link.shortUrl) return link.shortUrl;
    if (link.url) {
      try {
        const url = new URL(link.url);
        return url.hostname.replace("www.", "");
      } catch (e) {
        return link.url;
      }
    }
  }

  return name;
}
