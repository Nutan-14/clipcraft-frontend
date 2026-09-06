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

import { initEditor } from "../editor/editor.js";

// =========================================================
// APPLICATION STATE
// =========================================================

const appState = {
  currentView: "dashboard",
  selectedFile: null,
  selectedProjectId: null,
  projects: JSON.parse(localStorage.getItem("clipcraft_projects") || "[]")
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
          ${appState.projects.length}
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
            id="viewAllProjectsButton"
          >
            View All
          </button>

        </div>

      </div>



      <div class="project-grid">

        ${
          appState.projects.length > 0
            ? appState.projects
                .slice()
                .reverse()
                .slice(0, 3)
                .map((project, index) => `
            
                  <article
                    class="project-card"
                    data-project-id="${project.id}"
                  >

                    <div class="project-thumbnail">

                      <span>
                        Project ${String(index + 1).padStart(2, "0")}
                      </span>

                    </div>


                    <div class="project-card-content">

                      <div>

                        <h3>
                          ${project.name}
                        </h3>

                        <p>
                          ${
                            project.videoName
                              ? `Video: ${project.videoName}`
                              : "No video uploaded yet"
                          }
                        </p>

                      </div>


                      ${createIconButton({
                        icon: "⋮",
                        label: "Project options",
                        className: "project-menu-button"
                      })}

                    </div>

                  </article>

                `)
                .join("")
            : `
                <div class="editor-placeholder">

                  <div class="editor-placeholder-icon">
                    ◇
                  </div>

                  <span class="entry-eyebrow">
                    CLIPCRAFT
                  </span>

                  <h2>
                    No projects yet
                  </h2>

                  <p>
                    Create your first video project to start editing.
                  </p>

                </div>
              `
        }

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

  const recentProjectCards =
    document.querySelectorAll(".project-card[data-project-id]");

  recentProjectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = Number(card.dataset.projectId);

      const project = appState.projects.find(
        (item) => item.id === projectId
      );

      if (!project) return;

      appState.selectedProjectId = project.id;

      if (
        project.videoName &&
        window.clipcraftSelectedFile &&
        window.clipcraftSelectedFile.name === project.videoName
      ) {
        appState.selectedFile = window.clipcraftSelectedFile;
        showEditor();
        return;
      }

      showEntry();
    });
  });

  initDashboardActions();
  const viewAllProjectsButton =
    document.getElementById("viewAllProjectsButton");

  if (viewAllProjectsButton) {
    viewAllProjectsButton.addEventListener("click", () => {
      showProjects();
      setActiveNavigation("projects");
    });
  }

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


  mainView.innerHTML = "";


  initEditor(mainView, appState.selectedFile);

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

        if (page === "projects") {

          showProjects();

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

// =========================================================
// PROJECTS PAGE
// =========================================================
function showProjects() {
  const mainView = document.getElementById("mainView");

  if (!mainView) return;

  appState.currentView = "projects";

  mainView.innerHTML = `
    <section class="dashboard-section">

      <div class="section-heading">
        <div>
          <span class="section-eyebrow">CLIPCRAFT WORKSPACE</span>
          <h1>Projects</h1>
          <p>Manage your video projects and start editing.</p>
        </div>

        <button
          type="button"
          class="primary-action-button"
          id="projectsCreateButton"
        >
          + Create New Project
        </button>
      </div>

      <div class="project-grid">
        ${
          appState.projects.length > 0
            ? appState.projects.map((project) => `
                <article class="project-card" data-project-id="${project.id}">
                  <div class="project-card-preview">
                    <span>PROJECT</span>
                  </div>

                  <div class="project-card-content">
                    <span class="project-card-label">VIDEO PROJECT</span>
                    <h3>${project.name}</h3>
                    <p>
                      ${
                        project.videoName
                          ? `Video: ${project.videoName}`
                          : "No video uploaded yet"
                      }
                    </p>
                  </div>
                </article>
              `).join("")
            : `
                <div class="editor-placeholder">
                  <div class="editor-placeholder-icon">◇</div>
                  <span class="entry-eyebrow">CLIPCRAFT</span>
                  <h2>No projects yet</h2>
                  <p>Create your first video project to start editing.</p>
                </div>
              `
        }
      </div>

    </section>
  `;

  const createButton = document.getElementById("projectsCreateButton");

  if (createButton) {
    createButton.addEventListener("click", () => {
      const modal = document.getElementById("projectModal");

      if (!modal) return;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");

      const projectNameInput =
        document.getElementById("modalProjectName");

      if (projectNameInput) {
        projectNameInput.value = "";
        projectNameInput.focus();
      }
    });
  }
  const projectCards = document.querySelectorAll(".project-card[data-project-id]");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = Number(card.dataset.projectId);

      const project = appState.projects.find(
        (item) => item.id === projectId
      );

      if (!project) return;

      appState.selectedProjectId = project.id;

      console.log("Opening project:", project.name);

      // If this project already has a video in the current session,
      // reopen the editor directly.
      if (
        project.videoName &&
        window.clipcraftSelectedFile &&
        window.clipcraftSelectedFile.name === project.videoName
      ) {
        appState.selectedFile = window.clipcraftSelectedFile;
        showEditor();
        return;
      }

      // Otherwise, open the upload screen.
      showEntry();
    });
  });
}
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


          if (action === "new-project") {
            const modal = document.getElementById("projectModal");

            if (!modal) return;

            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");

            const projectNameInput =
              document.getElementById("modalProjectName");

            if (projectNameInput) {
              projectNameInput.value = "";
              projectNameInput.focus();
            }

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

function initGlobalActions() {

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
            projectNameError.textContent = "Please enter a project name.";
          }
          return;
        }

        const project = {
          id: Date.now(),
          name: name,
          createdAt: new Date().toISOString()
        };

        appState.projects.push(project);

        appState.selectedProjectId = project.id;

        localStorage.setItem(
          "clipcraft_projects",
          JSON.stringify(appState.projects)
        );

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
  window.addEventListener("clipcraft:open-editor", (event) => {
    const file = event.detail?.file || null;

    appState.selectedFile = file;

    // Keep the selected video connected to the current project
    if (appState.selectedProjectId && file) {
      const project = appState.projects.find(
        (item) => item.id === appState.selectedProjectId
      );

      if (project) {
        project.videoName = file.name;
        project.videoSize = file.size;

        localStorage.setItem(
          "clipcraft_projects",
          JSON.stringify(appState.projects)
        );
      }
    }

    showEditor();
  });
}