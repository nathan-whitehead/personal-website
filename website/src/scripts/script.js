// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const themeIcon = themeToggle.querySelector(".material-symbols-outlined");

// Check for saved theme preference or use browser preference
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

// Apply the theme
html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
  updateThemeImages(newTheme);
});

function updateIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}
function updateThemeImages(theme) {
  // Get all light mode images
  const lightModeImages = document.querySelectorAll(".light-mode");
  // Get all dark mode images
  const darkModeImages = document.querySelectorAll(".dark-mode");

  if (theme === "dark") {
    // Hide light mode images, show dark mode images
    lightModeImages.forEach((img) => (img.style.display = "none"));
    darkModeImages.forEach((img) => (img.style.display = "inline"));
  } else {
    // Show light mode images, hide dark mode images
    lightModeImages.forEach((img) => (img.style.display = "inline"));
    darkModeImages.forEach((img) => (img.style.display = "none"));
  }
}

// Run this on DOMContentLoaded to ensure all images are processed on page load
document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = html.getAttribute("data-theme");
  updateThemeImages(currentTheme);
});
