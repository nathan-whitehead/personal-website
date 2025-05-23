module.exports = {
  year: function () {
    return new Date().getFullYear();
  },

  formattedDate: function (date, format) {
    // Implementation for formatted date
    return new Date(date).toLocaleDateString();
  },
};
