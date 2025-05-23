/**
 * Limits an array to the specified number of items
 * @param {Array} array - The array to limit
 * @param {number} limit - Maximum number of items to return
 * @returns {Array} - Limited array
 */
module.exports = function (array, limit) {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.slice(0, limit);
};
