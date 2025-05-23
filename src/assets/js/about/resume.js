document.addEventListener("DOMContentLoaded", () => {
  // Add toggle indicators and event handlers
  const sections = document.querySelectorAll(".collapsible-section");

  sections.forEach((section) => {
    const summary = section.querySelector("summary");

    // Optional: Add indicator icon
    const indicator = document.createElement("span");
    indicator.className = "toggle-indicator material-symbols-outlined";
    indicator.textContent = section.open
      ? "keyboard_arrow_up"
      : "keyboard_arrow_down";
    summary.appendChild(indicator);

    // Update indicator when toggled
    section.addEventListener("toggle", () => {
      indicator.textContent = section.open
        ? "keyboard_arrow_up"
        : "keyboard_arrow_down";
      updateToggleAllButton(sections, toggleAllBtn);
    });
  });

  // url hash navigation
  function handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const targetSection = document.getElementById(hash);
      if (
        targetSection &&
        targetSection.classList.contains("collapsible-section")
      ) {
        targetSection.open = true;
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
  window.addEventListener("hashchange", handleHashNavigation);
  handleHashNavigation(); // Run on page load

  const toggleAllBtn = document.getElementById("toggleAllSections");
  toggleAllBtn.addEventListener("click", () => {
    toggleAllSections(sections, toggleAllBtn);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll(".nav-sections a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Open the section if it's collapsed
        targetElement.open = true;

        // Scroll to the section
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

function allSectionsOpen(sections) {
  return Array.from(sections).every((section) => section.open);
}
function setSectionCollapse(sections, state, toggleAllBtn) {
  sections.forEach((section) => {
    section.open = state;
  });
  updateToggleAllButton(sections, toggleAllBtn);
}

function updateToggleAllButton(sections, toggleAllBtn) {
  // const btnText = toggleAllBtn.querySelector(".btn-text");
  const btnIcon = toggleAllBtn.querySelector(".material-symbols-outlined");

  if (allSectionsOpen(sections)) {
    // btnText.textContent = "Collapse All";
    btnIcon.textContent = "unfold_less";
  } else {
    // btnText.textContent = "Expand All";
    btnIcon.textContent = "unfold_more";
  }
}

function toggleAllSections(sections, toggleAllBtn) {
  // const btnText = toggleAllBtn.querySelector(".btn-text");
  // const btnIcon = toggleAllBtn.querySelector(".material-symbols-outlined");

  if (allSectionsOpen(sections)) {
    setSectionCollapse(sections, false, toggleAllBtn);
    // btnText.textContent = "Expand All";
    // btnIcon.textContent = "unfold_more";
  } else {
    setSectionCollapse(sections, true, toggleAllBtn);
    // toggleAllBtn.textContent = "Collapse All";
    // btnIcon.textContent = "unfold_less";
  }
}
