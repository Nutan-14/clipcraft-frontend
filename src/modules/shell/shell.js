// =========================================================
// CLIPCRAFT - APPLICATION SHELL
// Rushikesh
// Dashboard + Entry + Navigation + Integration Flow
// =========================================================

import { renderHeader } from "./header.js";
import { renderSidebar } from "./sidebar.js";

import {
  createButton,
  createBadge,
  createCard,
  createInput,
  createIconButton,
  createLoadingState,
  createErrorState,
  createEmptyState,
  createSuccessState
} from "../shared/ui.js";

import { createProjectModal } from "../shared/modal.js";

import {
  renderEntry,
  initEntry
} from "./entry.js";
import {
  renderHelpSupport,
  initHelpSupport
} from "./help-support.js";


// =========================================================
// APPLICATION STATE
// =========================================================

const appState = {
  currentView: "dashboard",
  selectedFile: null
};


// =========================================================
// INITIALIZE SHELL
// =========================================================

export function initShell() {

  const app =
    document.getElementById("app");


  if (!app) {

    console.error(
      "ClipCraft: #app element not found."
    );

    return;
  }


  app.innerHTML = `

    <div class="app-shell">

      ${renderHeader()}

      ${renderSidebar()}


      <main class="main-content">

        <div
          class="main-content-inner"
          id="mainView"
        >
        </div>

      </main>


      ${createProjectModal()}

    </div>

  `;


  // -------------------------------------------------------
  // Initial view
  // -------------------------------------------------------

  renderDashboard();


  // -------------------------------------------------------
  // Initialize navigation
  // -------------------------------------------------------

  initNavigation();


  // -------------------------------------------------------
  // Initialize modal
  // -------------------------------------------------------

  initProjectModal();


  // -------------------------------------------------------
  // Initialize global actions
  // -------------------------------------------------------

  initGlobalActions();


  // -------------------------------------------------------
  // Initialize editor event
  // -------------------------------------------------------

  initEditorEvent();

}


// =========================================================
// RENDER DASHBOARD
// =========================================================

function renderDashboard() {

  const mainView =
    document.getElementById("mainView");


  if (!mainView) {
    return;
  }


  appState.currentView =
    "dashboard";


  mainView.innerHTML = `


    <!-- =============================================
         DASHBOARD HERO
         ============================================= -->

    <section class="dashboard-hero">


      <div class="dashboard-hero-text">

        <span class="dashboard-eyebrow">
          CLIPCRAFT WORKSPACE
        </span>


        <h1>
          Welcome back, Rushikesh 👋
        </h1>


        <p>
          Let's create something amazing today.
        </p>

      </div>


      ${createButton({
        text: "+ Create New Project",
        variant: "primary",
        id: "createProjectButton"
      })}

    </section>



    <!-- =============================================
         DASHBOARD STATISTICS
         ============================================= -->

    <section class="dashboard-stats">


      <!-- Total Projects -->

      <article class="stat-card">

        <div class="stat-card-top">

          <span class="stat-label">
            Total Projects
          </span>

          <span class="stat-icon">
            ▣
          </span>

        </div>


        <strong class="stat-value">
          12
        </strong>


        <span class="stat-meta">
          Projects created
        </span>

      </article>



      <!-- Media Files -->

      <article class="stat-card">

        <div class="stat-card-top">

          <span class="stat-label">
            Media Files
          </span>

          <span class="stat-icon">
            ▤
          </span>

        </div>


        <strong class="stat-value">
          45
        </strong>


        <span class="stat-meta">
          Files in library
        </span>

      </article>


    </section>



    <!-- =============================================
         RECENT PROJECTS
         ============================================= -->

    <section class="dashboard-section">


      <div class="section-heading">

        <div>

          <span class="section-eyebrow">
            WORKSPACE
          </span>


          <h2>
            Recent Projects
          </h2>

        </div>


        <div class="section-heading-actions">

          ${createBadge({
            text: "ACTIVE",
            variant: "primary"
          })}


          <button
            type="button"
            class="text-button"
          >
            View All
          </button>

        </div>

      </div>



      <div class="project-grid">


        <!-- Project 1 -->

        <article class="project-card">

          <div class="project-thumbnail">

            <span>
              Project 01
            </span>

          </div>


          <div class="project-card-content">

            <div>

              <h3>
                Summer Campaign
              </h3>

              <p>
                Edited 2 hours ago
              </p>

            </div>


            ${createIconButton({
              icon: "⋮",
              label: "Project options",
              className: "project-menu-button"
            })}

          </div>

        </article>



        <!-- Project 2 -->

        <article class="project-card">

          <div class="project-thumbnail">

            <span>
              Project 02
            </span>

          </div>


          <div class="project-card-content">

            <div>

              <h3>
                Product Launch
              </h3>

              <p>
                Edited yesterday
              </p>

            </div>


            ${createIconButton({
              icon: "⋮",
              label: "Project options",
              className: "project-menu-button"
            })}

          </div>

        </article>



        <!-- Project 3 -->

        <article class="project-card">

          <div class="project-thumbnail">

            <span>
              Project 03
            </span>

          </div>


          <div class="project-card-content">

            <div>

              <h3>
                Video Campaign
              </h3>

              <p>
                Edited 3 days ago
              </p>

            </div>


            ${createIconButton({
              icon: "⋮",
              label: "Project options",
              className: "project-menu-button"
            })}

          </div>

        </article>

      </div>

    </section>



    <!-- =============================================
         QUICK ACTIONS
         ============================================= -->

    <section class="dashboard-section">


      <div class="section-heading">

        <div>

          <span class="section-eyebrow">
            QUICK ACCESS
          </span>


          <h2>
            Quick Actions
          </h2>

        </div>

      </div>


      <div class="quick-action-grid">


        <!-- New Project -->

        <button
          type="button"
          class="quick-action-card"
          data-action="new-project"
        >

          <span class="quick-action-icon">
            +
          </span>


          <span class="quick-action-content">

            <strong>
              New Project
            </strong>

            <small>
              Start editing a video
            </small>

          </span>

        </button>



        <!-- Templates -->

        <button
          type="button"
          class="quick-action-card"
          data-action="templates"
        >

          <span class="quick-action-icon">
            ◇
          </span>


          <span class="quick-action-content">

            <strong>
              Templates
            </strong>

            <small>
              Browse ready designs
            </small>

          </span>

        </button>



        <!-- Import Media -->

        <button
          type="button"
          class="quick-action-card"
          data-action="import-media"
        >

          <span class="quick-action-icon">
            ↑
          </span>


          <span class="quick-action-content">

            <strong>
              Import Media
            </strong>

            <small>
              Add videos and images
            </small>

          </span>

        </button>

      </div>

    </section>

  `;


  // Initialize dashboard actions

  initDashboardActions();

}


// =========================================================
// SHOW ENTRY SCREEN
// =========================================================

function showEntry() {

  const mainView =
    document.getElementById("mainView");


  if (!mainView) {
    return;
  }


  appState.currentView =
    "entry";


  mainView.innerHTML =
    renderEntry();


  // Initialize upload interaction

  initEntry();

}


// =========================================================
// SHOW EDITOR
// =========================================================

function showEditor() {

  const mainView =
    document.getElementById("mainView");


  if (!mainView) {
    return;
  }


  appState.currentView =
    "editor";


  mainView.innerHTML = `

    <section class="editor-placeholder">


      <div class="editor-placeholder-icon">
        ✦
      </div>


      <span class="entry-eyebrow">
        CLIPCRAFT EDITOR
      </span>


      <h1>
        Editor Workspace
      </h1>


      <p>
        Your selected video is ready for the
        editing workspace.
      </p>


      ${
        appState.selectedFile
          ? `
            <div class="editor-ready-file">

              <strong>
                ${appState.selectedFile.name}
              </strong>

              <span>
                Selected video
              </span>

            </div>
          `
          : ""
      }


      <div class="editor-placeholder-grid">


        <div class="editor-placeholder-panel">
          Preview
        </div>


        <div class="editor-placeholder-panel">
          Timeline
        </div>


        <div class="editor-placeholder-panel">
          Controls
        </div>

      </div>


      <div class="editor-navigation-actions">


        <button
          type="button"
          class="secondary-editor-button"
          id="backToEntryButton"
        >
          ← Back to Upload
        </button>


        <button
          type="button"
          class="primary-action-button"
          id="backToDashboardButton"
        >
          Back to Dashboard
        </button>


      </div>


    </section>

  `;


  initEditorNavigation();

}


// =========================================================
// SIDEBAR NAVIGATION
// =========================================================

function initNavigation() {

  const navItems =
    document.querySelectorAll(
      ".nav-item"
    );


  navItems.forEach((item) => {

    item.addEventListener(
      "click",
      (event) => {

        event.preventDefault();


        navItems.forEach(
          (navItem) => {

            navItem.classList.remove(
              "active"
            );

          }
        );


        item.classList.add(
          "active"
        );


        const page =
          item.dataset.page;


        console.log(
          "Selected page:",
          page
        );


        if (page === "home") {

          renderDashboard();

          return;

        }

if (page === "help") {

  mainView.innerHTML = renderHelpSupport();

  initHelpSupport();

  return;

}
        showPlaceholderPage(page);

      }
    );

  });

}


// =========================================================
// FUTURE NAVIGATION PLACEHOLDER
// =========================================================

function showPlaceholderPage(page) {

  const mainView =
    document.getElementById("mainView");


  if (!mainView) {
    return;
  }


  mainView.innerHTML = `

    <section class="editor-placeholder">


      <div class="editor-placeholder-icon">
        ◇
      </div>


      <span class="entry-eyebrow">
        CLIPCRAFT
      </span>


      <h1>
        ${formatPageName(page)}
      </h1>


      <p>
        This section is ready for future
        module integration.
      </p>


      <button
        type="button"
        class="primary-action-button"
        id="returnHomeButton"
      >
        ← Return to Dashboard
      </button>

    </section>

  `;


  const returnHomeButton =
    document.getElementById(
      "returnHomeButton"
    );


  if (returnHomeButton) {

    returnHomeButton.addEventListener(
      "click",
      () => {

        renderDashboard();

        setActiveNavigation("home");

      }
    );

  }

}


// =========================================================
// FORMAT PAGE NAME
// =========================================================

function formatPageName(page) {

  if (!page) {
    return "ClipCraft";
  }


  return page
    .split("-")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

}


// =========================================================
// SET ACTIVE NAVIGATION
// =========================================================

function setActiveNavigation(page) {

  const navItems =
    document.querySelectorAll(
      ".nav-item"
    );


  navItems.forEach((item) => {

    item.classList.toggle(
      "active",
      item.dataset.page === page
    );

  });

}


// =========================================================
// DASHBOARD ACTIONS
// =========================================================

function initDashboardActions() {


  // -------------------------------------------------------
  // Create New Project
  // -------------------------------------------------------

  const createProjectButton =
    document.getElementById(
      "createProjectButton"
    );


  if (createProjectButton) {

  createProjectButton.addEventListener(
    "click",
    () => {

      const modal =
        document.getElementById(
          "projectModal"
        );

      if (!modal) {
        return;
      }

      modal.classList.add(
        "is-open"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );


      const projectNameInput =
        document.getElementById(
          "modalProjectName"
        );


      if (projectNameInput) {

        projectNameInput.value = "";

        projectNameInput.focus();

      }

    }
  );

}


  // -------------------------------------------------------
  // Quick Actions
  // -------------------------------------------------------

  const quickActionButtons =
    document.querySelectorAll(
      ".quick-action-card"
    );


  quickActionButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const action =
            button.dataset.action;


          if (
            action ===
            "new-project"
          ) {

            showEntry();

            return;

          }


          if (
            action ===
            "templates"
          ) {

            showPlaceholderPage(
              "templates"
            );

            setActiveNavigation(
              "templates"
            );

            return;

          }


          if (
            action ===
            "import-media"
          ) {

            showEntry();

            return;

          }


          console.log(
            "Quick action:",
            action
          );

        }
      );

    }
  );

}


// =========================================================
// GLOBAL ACTIONS
// =========================================================

// =========================================================
// GLOBAL ACTIONS
// =========================================================

function initGlobalActions() {

  // -------------------------------------------------------
  // BRAND CLICK
  // -------------------------------------------------------

  const brand =
    document.querySelector(
      ".brand"
    );


  if (brand) {

    brand.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        renderDashboard();

        setActiveNavigation(
          "home"
        );

      }
    );

  }


  // -------------------------------------------------------
  // GLOBAL SEARCH
  // -------------------------------------------------------

  const searchInput =
    document.getElementById(
      "globalSearchInput"
    );


  if (!searchInput) {
    return;
  }


  // -------------------------------------------------------
  // CTRL + K SHORTCUT
  // -------------------------------------------------------

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        searchInput.focus();

        searchInput.select();

      }

    }
  );


  // -------------------------------------------------------
  // ESCAPE TO CLEAR SEARCH FOCUS
  // -------------------------------------------------------

  searchInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        searchInput.blur();

      }

    }
  );


  // -------------------------------------------------------
  // SEARCH INPUT
  // -------------------------------------------------------

  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value.trim();


      if (!query) {

        console.log(
          "Search cleared"
        );

        return;

      }


      console.log(
        "Searching for:",
        query
      );

    }
  );

}

// =========================================================
// PROJECT MODAL
// =========================================================

function initProjectModal() {

  const modal =
    document.getElementById(
      "projectModal"
    );


  const closeButton =
    document.getElementById(
      "closeProjectModal"
    );


  const cancelButton =
    document.getElementById(
      "cancelProjectModal"
    );


  const createButton =
    document.getElementById(
      "confirmCreateProject"
    );


  const projectNameInput =
    document.getElementById(
      "modalProjectName"
    );


  const projectNameError =
    document.getElementById(
      "projectNameError"
    );


  if (!modal) {
    return;
  }


  function closeModal() {

    modal.classList.remove(
      "is-open"
    );


    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  function openModal() {

    modal.classList.add(
      "is-open"
    );


    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    if (projectNameInput) {

      projectNameInput.focus();

    }

  }


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeModal
    );

  }


  if (cancelButton) {

    cancelButton.addEventListener(
      "click",
      closeModal
    );

  }


  if (createButton) {

    createButton.addEventListener(
      "click",
      () => {

        const name =
          projectNameInput
            ? projectNameInput.value.trim()
            : "";


        if (!name) {

          if (projectNameError) {

            projectNameError.textContent =
              "Please enter a project name.";

          }

          return;

        }


        closeModal();


        showEntry();

      }
    );

  }


  modal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        modal.classList.contains(
          "is-open"
        )
      ) {

        closeModal();

      }

    }
  );


  /*
   * Modal remains available as a reusable
   * project creation component.
   */

}


// =========================================================
// EDITOR NAVIGATION
// =========================================================

function initEditorNavigation() {

  const backToEntryButton =
    document.getElementById(
      "backToEntryButton"
    );


  const backToDashboardButton =
    document.getElementById(
      "backToDashboardButton"
    );


  if (backToEntryButton) {

    backToEntryButton.addEventListener(
      "click",
      () => {

        showEntry();

      }
    );

  }


  if (backToDashboardButton) {

    backToDashboardButton.addEventListener(
      "click",
      () => {

        renderDashboard();

        setActiveNavigation(
          "home"
        );

      }
    );

  }

}


// =========================================================
// EDITOR EVENT
// =========================================================

function initEditorEvent() {

  window.addEventListener(
    "clipcraft:open-editor",
    (event) => {

      const file =
        event.detail?.file ||
        null;


      appState.selectedFile =
        file;


      showEditor();

    }
  );

}