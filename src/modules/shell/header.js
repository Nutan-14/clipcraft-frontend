// =========================================================
// CLIPCRAFT - PROFESSIONAL HEADER
// Rushikesh
// =========================================================

export function renderHeader() {
  return `
    <header class="app-header">

      <!-- =================================================
           LEFT - BRAND
           ================================================= -->

      <div class="header-left">

        <a
          href="#"
          class="brand"
          aria-label="ClipCraft Home"
        >

          <div class="brand-mark">
            <span class="brand-mark-shape"></span>
          </div>


          <div class="brand-text">

            <span class="brand-name">
              ClipCraft
            </span>

            <span class="brand-tagline">
              AI Video Studio
            </span>

          </div>

        </a>

      </div>


      <!-- =================================================
           CENTER - SEARCH
           ================================================= -->

      <div class="header-center">

        <div class="global-search">

          <span
            class="search-icon"
            aria-hidden="true"
          >
            ⌕
          </span>


          <input
  type="search"
  class="global-search-input"
  id="globalSearchInput"
  placeholder="Search projects, media, templates..."
  aria-label="Search ClipCraft"
/>

          <span class="search-shortcut">
            Ctrl K
          </span>

        </div>

      </div>


      <!-- =================================================
           RIGHT - ACTIONS
           ================================================= -->

      <div class="header-right">


        <!-- Notification -->

        <button
          type="button"
          class="header-icon-button notification-button"
          aria-label="Notifications"
          title="Notifications"
        >

          <span
            class="notification-icon"
            aria-hidden="true"
          >
            🔔
          </span>


          <span class="notification-badge">
            3
          </span>

        </button>


        <!-- Divider -->

        <div class="header-divider"></div>


        <!-- Profile -->

        <button
          type="button"
          class="profile-button"
          aria-label="Open profile menu"
        >

          <div class="profile-avatar">
            RM
          </div>


          <div class="profile-details">

            <span class="profile-name">
              Rushikesh
            </span>


            <span class="profile-plan">
              Free Plan
            </span>

          </div>


          <span class="profile-arrow">
            ▾
          </span>

        </button>

      </div>

    </header>
  `;
}