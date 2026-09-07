// =========================================================
// CLIPCRAFT - MODAL COMPONENT
// Rushikesh - Shared UI
// =========================================================

export function createProjectModal() {
  return `
    <div
      class="modal-overlay"
      id="projectModal"
      aria-hidden="true"
    >

      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projectModalTitle"
      >

        <!-- Modal Header -->
        <div class="modal-header">

          <div>
            <span class="modal-eyebrow">
              NEW PROJECT
            </span>

            <h2 id="projectModalTitle">
              Create New Project
            </h2>

            <p>
              Start a new video editing project.
            </p>
          </div>

          <button
            type="button"
            class="modal-close-button"
            id="closeProjectModal"
            aria-label="Close modal"
          >
            ×
          </button>

        </div>


        <!-- Modal Body -->
        <div class="modal-body">

          <label
            for="modalProjectName"
            class="modal-label"
          >
            Project Name
          </label>

          <input
            type="text"
            id="modalProjectName"
            class="modal-input"
            placeholder="Enter project name..."
            autocomplete="off"
          />

          <p
            class="modal-error"
            id="projectNameError"
          ></p>

        </div>


        <!-- Modal Footer -->
        <div class="modal-footer">

          <button
            type="button"
            class="modal-cancel-button"
            id="cancelProjectModal"
          >
            Cancel
          </button>

          <button
            type="button"
            class="modal-create-button"
            id="confirmCreateProject"
          >
            Create Project
          </button>

        </div>

      </div>

    </div>
  `;
}