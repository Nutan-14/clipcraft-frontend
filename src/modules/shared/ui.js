// Rushikesh: Reusable UI Components
// Shared components for the ClipCraft frontend

export function createButton({
  text = "Button",
  variant = "primary",
  type = "button",
  className = "",
  id = ""
} = {}) {
  return `
    <button
      type="${type}"
      class="ui-button ui-button-${variant} ${className}"
      ${id ? `id="${id}"` : ""}
    >
      ${text}
    </button>
  `;
}


export function createIconButton({
  icon = "•",
  label = "Action",
  className = "",
  id = ""
} = {}) {
  return `
    <button
      type="button"
      class="ui-icon-button ${className}"
      aria-label="${label}"
      title="${label}"
      ${id ? `id="${id}"` : ""}
    >
      <span aria-hidden="true">${icon}</span>
    </button>
  `;
}


export function createBadge({
  text = "Badge",
  variant = "default",
  className = ""
} = {}) {
  return `
    <span class="ui-badge ui-badge-${variant} ${className}">
      ${text}
    </span>
  `;
}


export function createCard({
  title = "",
  content = "",
  className = ""
} = {}) {
  return `
    <article class="ui-card ${className}">
      ${title ? `<h3 class="ui-card-title">${title}</h3>` : ""}
      <div class="ui-card-content">
        ${content}
      </div>
    </article>
  `;
}


export function createInput({
  type = "text",
  placeholder = "",
  value = "",
  name = "",
  id = "",
  label = ""
} = {}) {
  return `
    <div class="ui-input-group">

      ${
        label
          ? `<label
               class="ui-input-label"
               ${id ? `for="${id}"` : ""}
             >
               ${label}
             </label>`
          : ""
      }

      <input
        type="${type}"
        class="ui-input"
        placeholder="${placeholder}"
        value="${value}"
        ${name ? `name="${name}"` : ""}
        ${id ? `id="${id}"` : ""}
      />

    </div>
  `;
}
// =========================================================
// LOADING STATE
// =========================================================

export function createLoadingState({
  title = "Loading ClipCraft...",
  message = "Please wait a moment.",
  className = ""
} = {}) {

  return `
    <div class="ui-loading-state ${className}">

      <div
        class="ui-loading-spinner"
        aria-hidden="true"
      ></div>

      <h3 class="ui-loading-title">
        ${title}
      </h3>

      <p class="ui-loading-message">
        ${message}
      </p>

    </div>
  `;
}
// =========================================================
// ERROR STATE
// =========================================================

export function createErrorState({
  title = "Something went wrong.",
  message = "Please try again.",
  actionText = "Try Again",
  className = ""
} = {}) {

  return `
    <div class="ui-error-state ${className}">

      <div
        class="ui-error-icon"
        aria-hidden="true"
      >
        !
      </div>

      <h3 class="ui-error-title">
        ${title}
      </h3>

      <p class="ui-error-message">
        ${message}
      </p>

      ${
        actionText
          ? `
            <button
              type="button"
              class="ui-error-action"
            >
              ${actionText}
            </button>
          `
          : ""
      }

    </div>
  `;
}
// =========================================================
// EMPTY STATE
// =========================================================

export function createEmptyState({
  title = "Nothing here yet",
  message = "There is no content to display.",
  actionText = "",
  className = ""
} = {}) {

  return `
    <div class="ui-empty-state ${className}">

      <div
        class="ui-empty-icon"
        aria-hidden="true"
      >
        +
      </div>


      <h3 class="ui-empty-title">
        ${title}
      </h3>


      <p class="ui-empty-message">
        ${message}
      </p>


      ${
        actionText
          ? `
            <button
  type="button"
  class="ui-empty-action"
  data-empty-action="create-project"
>
  ${actionText}
</button>
          `
          : ""
      }

    </div>
  `;
}
// =========================================================
// SUCCESS STATE
// =========================================================

export function createSuccessState({
  title = "Success",
  message = "Your action was completed successfully.",
  className = ""
} = {}) {

  return `
    <div class="ui-success-state ${className}">

      <div
        class="ui-success-icon"
        aria-hidden="true"
      >
        ✓
      </div>

      <h3 class="ui-success-title">
        ${title}
      </h3>

      <p class="ui-success-message">
        ${message}
      </p>

    </div>
  `;
}