// main init function
function initializeResume() {
  let toggleBtn = document.getElementById("toggleAllSections");
  let detailsElements = document.querySelectorAll("details");
  const resumeNav = document.getElementById("resume-nav") as HTMLElement;
  const siteHeader = document.getElementById("site-header") as HTMLElement;

  // return if not found
  if (!toggleBtn || detailsElements.length === 0 || !resumeNav || !siteHeader)
    return;

  let navHeight = resumeNav?.offsetHeight || 0;
  let headerHeight = siteHeader?.offsetHeight || 0;

  // Function to check if all sections are open
  function allSectionsOpen() {
    // Use current query to get up-to-date elements
    const currentDetails = document.querySelectorAll("details");
    return Array.from(currentDetails).every((details) => details.open);
  }

  // Function to update the toggle button icon
  function updateToggleButton() {
    // Always get the current toggle button
    const currentToggleBtn = document.getElementById("toggleAllSections");
    if (!currentToggleBtn) return;

    const icon = currentToggleBtn.querySelector(".material-symbols-outlined");
    if (icon) {
      icon.textContent = allSectionsOpen() ? "unfold_less" : "unfold_more";
    }
  }

  // Function to scroll to an element with offset for the sticky nav
  function scrollToWithOffset(element: HTMLElement) {
    const elementPosition = element.getBoundingClientRect().top;
    const extraPadding = 2;

    // Get current values to ensure accuracy
    const currentNav = document.getElementById("resume-nav");
    const currentHeader = document.getElementById("site-header");
    if (!currentNav || !currentHeader) return;

    const navHeight = currentNav.offsetHeight;
    const headerHeight = currentHeader.offsetHeight;

    const offsetPosition =
      elementPosition +
      window.pageYOffset -
      navHeight -
      headerHeight -
      extraPadding;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  // Function to update resume nav position based on header visibility
  function updateResumeNavPosition() {
    const currentNav = document.getElementById("resume-nav");
    const currentHeader = document.getElementById("site-header");

    if (!currentNav || !currentHeader) return;

    // Recalculate heights in case of window resizing
    navHeight = currentNav.offsetHeight;
    headerHeight = currentHeader.offsetHeight;
    currentNav.style.top = `${headerHeight}px`;
  }

  // immediately set initial position
  updateResumeNavPosition();

  // Handle toggle button clicks
  function handleToggleClick() {
    // If all sections are open, close them all; otherwise, open them all
    const newState = !allSectionsOpen();

    // Get current details elements to ensure we're working with up-to-date DOM
    const currentDetails = document.querySelectorAll("details");
    currentDetails.forEach((details) => {
      details.open = newState;
    });

    updateToggleButton();
  }

  // Clone each details element to remove all event listeners
  Array.from(detailsElements).forEach((details) => {
    const wasOpen = details.open;
    const clone = details.cloneNode(true) as HTMLDetailsElement;
    clone.open = wasOpen;
    details.parentNode?.replaceChild(clone, details);
  });

  // Get fresh references after DOM changes
  detailsElements = document.querySelectorAll("details");

  // Add toggle event listeners to the fresh details elements
  detailsElements.forEach((details) => {
    details.addEventListener("toggle", updateToggleButton);
  });

  // Clone and replace the toggle button
  const newToggleBtn = toggleBtn.cloneNode(true);
  toggleBtn.parentNode?.replaceChild(newToggleBtn, toggleBtn);

  // Update our reference to the new button
  toggleBtn = document.getElementById("toggleAllSections");

  // Add the event listener to the new button
  toggleBtn?.addEventListener("click", handleToggleClick);

  // Handle URL hash navigation
  function handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const targetSection = document.getElementById(hash);
      if (targetSection && targetSection.tagName.toLowerCase() === "details") {
        (targetSection as HTMLDetailsElement).open = true;
        updateToggleButton();
        setTimeout(() => {
          scrollToWithOffset(targetSection);
        }, 100);
      }
    }
  }

  // Handle anchor clicks
  function handleAnchorClick(this: HTMLAnchorElement, e: Event) {
    e.preventDefault();
    const targetId = this.getAttribute("href")?.substring(1);
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (targetElement) {
      (targetElement as HTMLDetailsElement).open = true;
      updateToggleButton();

      setTimeout(() => {
        scrollToWithOffset(targetElement);
      }, 50);

      history.pushState(null, "", `#${targetId}`);
    }
  }

  // Replace nav links with clones
  const navLinks = document.querySelectorAll(".nav-sections a");
  navLinks.forEach((anchor) => {
    const clone = anchor.cloneNode(true);
    anchor.parentNode?.replaceChild(clone, anchor);
  });

  // Add click handlers to the fresh nav links
  document.querySelectorAll(".nav-sections a").forEach((anchor) => {
    anchor.addEventListener("click", handleAnchorClick);
  });

  // Handle resize events
  window.removeEventListener("resize", updateResumeNavPosition);
  window.addEventListener("resize", updateResumeNavPosition);

  // Handle hash changes
  window.removeEventListener("hashchange", handleHashNavigation);
  window.addEventListener("hashchange", handleHashNavigation);

  // Handle hash on page load/transition
  handleHashNavigation();

  // Set initial button state
  updateToggleButton();
}

function cleanupResume() {
  window.removeEventListener("resize", () => {});
  window.removeEventListener("hashchange", () => {});
}

document.addEventListener("DOMContentLoaded", initializeResume);
document.addEventListener("astro:page-load", initializeResume);
document.addEventListener("astro:before-swap", cleanupResume);
