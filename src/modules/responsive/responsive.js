// =========================================================
// CLIPCRAFT - RESPONSIVE / MOBILE UI
// Owner: Rupesh
// =========================================================
// Handles:
// - Desktop / Tablet / Mobile detection
// - Responsive viewport state
// - Mobile sidebar
// - Mobile menu button
// - Resize handling
// - Orientation change
// =========================================================

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};


// =========================================================
// GET VIEWPORT TYPE
// =========================================================

export function getViewportType() {
  const width = window.innerWidth;

  if (width < BREAKPOINTS.mobile) {
    return "mobile";
  }

  if (width < BREAKPOINTS.tablet) {
    return "tablet";
  }

  return "desktop";
}


// =========================================================
// UPDATE RESPONSIVE STATE
// =========================================================

function updateResponsiveState() {
  const viewport = getViewportType();

  document.documentElement.dataset.viewport = viewport;
  document.body.dataset.viewport = viewport;

  document.documentElement.style.setProperty(
    "--viewport-width",
    `${window.innerWidth}px`
  );

  document.documentElement.style.setProperty(
    "--viewport-height",
    `${window.innerHeight}px`
  );

  document.dispatchEvent(
    new CustomEvent("clipcraft:viewport-change", {
      detail: {
        type: viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    })
  );
}


// =========================================================
// MOBILE SIDEBAR
// =========================================================

function setupMobileSidebar() {
  const sidebar = document.querySelector(".app-sidebar");
  const header = document.querySelector(".app-header");

  if (!sidebar || !header) {
    console.warn(
      "[ClipCraft Responsive] Header or sidebar not found."
    );

    return;
  }


  // -------------------------------------------------------
  // Create mobile menu button
  // -------------------------------------------------------

  let menuButton = document.querySelector(
    ".responsive-menu-button"
  );

  if (!menuButton) {
    menuButton = document.createElement("button");

    menuButton.type = "button";

    menuButton.className =
      "responsive-menu-button";

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.innerHTML = "☰";

    header.prepend(menuButton);
  }


  // -------------------------------------------------------
  // Create overlay
  // -------------------------------------------------------

  let overlay = document.querySelector(
    ".responsive-sidebar-overlay"
  );

  if (!overlay) {
    overlay = document.createElement("div");

    overlay.className =
      "responsive-sidebar-overlay";

    overlay.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.appendChild(overlay);
  }


  // -------------------------------------------------------
  // Open sidebar
  // -------------------------------------------------------

  const openSidebar = () => {
    sidebar.classList.add(
      "is-mobile-open"
    );

    overlay.classList.add(
      "is-visible"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Close navigation"
    );

    document.body.classList.add(
      "sidebar-open"
    );
  };


  // -------------------------------------------------------
  // Close sidebar
  // -------------------------------------------------------

  const closeSidebar = () => {
    sidebar.classList.remove(
      "is-mobile-open"
    );

    overlay.classList.remove(
      "is-visible"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );

    document.body.classList.remove(
      "sidebar-open"
    );
  };


  // -------------------------------------------------------
  // Toggle sidebar
  // -------------------------------------------------------

  menuButton.addEventListener(
    "click",
    () => {
      const isOpen =
        sidebar.classList.contains(
          "is-mobile-open"
        );

      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  );


  // -------------------------------------------------------
  // Overlay click
  // -------------------------------------------------------

  overlay.addEventListener(
    "click",
    closeSidebar
  );


  // -------------------------------------------------------
  // Navigation click
  // -------------------------------------------------------

  sidebar
    .querySelectorAll(
      ".nav-item"
    )
    .forEach((item) => {

      item.addEventListener(
        "click",
        () => {

          if (
            getViewportType() ===
            "mobile"
          ) {
            closeSidebar();
          }

        }
      );

    });


  // -------------------------------------------------------
  // ESC key
  // -------------------------------------------------------

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {
        closeSidebar();
      }

    }
  );


  // -------------------------------------------------------
  // Resize
  // -------------------------------------------------------

  window.addEventListener(
    "resize",
    () => {

      if (
        getViewportType() !==
        "mobile"
      ) {
        closeSidebar();
      }

    }
  );
}


// =========================================================
// RESPONSIVE CONTROLS
// =========================================================

function setupResponsiveControls() {

  document.addEventListener(
    "click",
    (event) => {

      const control =
        event.target.closest(
          "[data-responsive-toggle]"
        );

      if (!control) {
        return;
      }

      const targetSelector =
        control.dataset.responsiveToggle;

      if (!targetSelector) {
        return;
      }

      const target =
        document.querySelector(
          targetSelector
        );

      if (!target) {
        console.warn(
          "[ClipCraft Responsive] Target not found:",
          targetSelector
        );

        return;
      }

      const isHidden =
        target.hasAttribute("hidden");

      target.toggleAttribute(
        "hidden",
        !isHidden
      );

      control.setAttribute(
        "aria-expanded",
        String(isHidden)
      );
    }
  );
}


// =========================================================
// RESIZE HANDLER
// =========================================================

function setupResizeHandler() {

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );

      resizeTimer = setTimeout(
        () => {

          updateResponsiveState();

        },
        150
      );

    }
  );
}


// =========================================================
// ORIENTATION CHANGE
// =========================================================

function setupOrientationHandler() {

  window.addEventListener(
    "orientationchange",
    () => {

      setTimeout(
        () => {
          updateResponsiveState();
        },
        200
      );

    }
  );
}


// =========================================================
// INITIALIZE
// =========================================================

export function initResponsive() {

  updateResponsiveState();

  setupMobileSidebar();

  setupResponsiveControls();

  setupResizeHandler();

  setupOrientationHandler();

  console.info(
    `[ClipCraft] Responsive layer initialized: ${getViewportType()}`
  );
}