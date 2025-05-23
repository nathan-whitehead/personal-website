module.exports = {
  // Format date for display
  dateFilter: function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  // Format date for datetime attribute
  dateISO: function (date) {
    return new Date(date).toISOString().substring(0, 10);
  },

  // Convert string to slug
  slug: function (str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  },
};
