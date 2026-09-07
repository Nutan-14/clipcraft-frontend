// =========================================================
// CLIPCRAFT - UI QUALITY CHECK
// Owner: Rupesh
// =========================================================
// Checks:
// - Horizontal overflow
// - Images
// - Buttons
// - Links
// - Touch targets
// - Viewport meta
// =========================================================


// =========================================================
// UI QUALITY CHECKLIST
// =========================================================

export const uiQualityChecklist = [
  "Navigation works",
  "Buttons provide feedback",
  "Upload flow is clear",
  "Preview is readable",
  "Timeline is usable",
  "Loading/error states are visible",
  "Desktop layout checked",
  "Tablet layout checked",
  "Mobile layout checked",
  "No horizontal overflow",
  "Images have alt attributes",
  "Interactive controls have labels",
  "Touch targets are usable",
];


// =========================================================
// CHECK VIEWPORT META
// =========================================================

function checkViewportMeta() {

  const viewport =
    document.querySelector(
      'meta[name="viewport"]'
    );

  if (!viewport) {

    console.warn(
      "[UI Quality] Viewport meta tag is missing."
    );

    return false;
  }

  return true;
}


// =========================================================
// CHECK HORIZONTAL OVERFLOW
// =========================================================

function checkHorizontalOverflow() {

  const documentWidth =
    document.documentElement.scrollWidth;

  const viewportWidth =
    window.innerWidth;

  const hasOverflow =
    documentWidth >
    viewportWidth + 1;

  if (hasOverflow) {

    console.warn(
      "[UI Quality] Horizontal overflow detected.",
      {
        documentWidth,
        viewportWidth,
      }
    );

  }

  return !hasOverflow;
}


// =========================================================
// CHECK IMAGES
// =========================================================

function checkImages() {

  const images =
    document.querySelectorAll("img");

  let missingAlt = 0;

  images.forEach((image) => {

    if (
      !image.hasAttribute("alt")
    ) {

      missingAlt++;

      console.warn(
        "[UI Quality] Image without alt:",
        image
      );

    }

  });

  return missingAlt === 0;
}


// =========================================================
// CHECK BUTTONS
// =========================================================

function checkButtons() {

  const buttons =
    document.querySelectorAll(
      "button"
    );

  let invalidButtons = 0;

  buttons.forEach((button) => {

    const text =
      button.textContent.trim();

    const ariaLabel =
      button.getAttribute(
        "aria-label"
      );

    const title =
      button.getAttribute(
        "title"
      );

    if (
      !text &&
      !ariaLabel &&
      !title
    ) {

      invalidButtons++;

      console.warn(
        "[UI Quality] Button needs accessible label:",
        button
      );

    }

  });

  return invalidButtons === 0;
}


// =========================================================
// CHECK LINKS
// =========================================================

function checkLinks() {

  const links =
    document.querySelectorAll(
      "a[href]"
    );

  let invalidLinks = 0;

  links.forEach((link) => {

    const href =
      link.getAttribute(
        "href"
      );

    if (
      !href ||
      href.trim() === "#"
    ) {

      invalidLinks++;

      console.warn(
        "[UI Quality] Invalid link:",
        link
      );

    }

  });

  return invalidLinks === 0;
}


// =========================================================
// CHECK TOUCH TARGETS
// =========================================================

function checkTouchTargets() {

  const controls =
    document.querySelectorAll(
      "button, a, input, select, textarea"
    );

  let smallTargets = 0;

  controls.forEach((control) => {

    const rect =
      control.getBoundingClientRect();

    // Ignore hidden elements

    if (
      rect.width === 0 ||
      rect.height === 0
    ) {
      return;
    }

    if (
      rect.width < 40 ||
      rect.height < 40
    ) {

      smallTargets++;

      console.warn(
        "[UI Quality] Small touch target:",
        control
      );

    }

  });

  return smallTargets === 0;
}


// =========================================================
// RUN ALL CHECKS
// =========================================================

export function runUIQualityCheck() {

  const results = {

    viewportMeta:
      checkViewportMeta(),

    horizontalOverflow:
      checkHorizontalOverflow(),

    images:
      checkImages(),

    buttons:
      checkButtons(),

    links:
      checkLinks(),

    touchTargets:
      checkTouchTargets(),

  };


  const total =
    Object.keys(
      results
    ).length;

  const passed =
    Object.values(
      results
    ).filter(Boolean).length;


  console.info(
    `[UI Quality] ${passed}/${total} checks passed.`,
    results
  );


  return results;
}


// =========================================================
// INITIALIZE
// =========================================================

export function initUIQuality() {

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      runUIQualityCheck,
      {
        once: true,
      }
    );

  } else {

    runUIQualityCheck();

  }

}