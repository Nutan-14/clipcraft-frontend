// =========================================================
// CLIPCRAFT - SIDEBAR & NAVIGATION
// Rushikesh
// =========================================================

export function renderSidebar() {

  return `

    <aside class="app-sidebar">


      <!-- =================================================
           SIDEBAR HEADER
           ================================================= -->

      <div class="sidebar-header">

        <span class="sidebar-header-title">
          NAVIGATION
        </span>

      </div>


      <!-- =================================================
           WORKSPACE
           ================================================= -->

      <section class="sidebar-group">

        <h3 class="sidebar-section-title">
          WORKSPACE
        </h3>


        <nav
          class="sidebar-nav"
          aria-label="Workspace navigation"
        >


          <!-- HOME -->

          <a
            href="#"
            class="nav-item active"
            data-page="home"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ⌂
            </span>

            <span class="nav-label">
              Home
            </span>

          </a>


          <!-- PROJECTS -->

          <a
            href="#"
            class="nav-item"
            data-page="projects"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ▣
            </span>

            <span class="nav-label">
              Projects
            </span>

          </a>


          <!-- TEMPLATES -->

          <a
            href="#"
            class="nav-item"
            data-page="templates"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ◇
            </span>

            <span class="nav-label">
              Templates
            </span>

          </a>


          <!-- MEDIA LIBRARY -->

          <a
            href="#"
            class="nav-item"
            data-page="media"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ▤
            </span>

            <span class="nav-label">
              Media Library
            </span>

          </a>

        </nav>

      </section>



      <!-- =================================================
           TEAM
           ================================================= -->

      <section class="sidebar-group">

        <h3 class="sidebar-section-title">
          TEAM
        </h3>


        <nav
          class="sidebar-nav"
          aria-label="Team navigation"
        >


          <!-- TEAM -->

          <a
            href="#"
            class="nav-item"
            data-page="team"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ♙
            </span>

            <span class="nav-label">
              Team
            </span>

          </a>


          <!-- ANALYTICS HISTORY -->

          <a
            href="#"
            class="nav-item"
            data-page="analytics-history"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ▥
            </span>

            <span class="nav-label">
              Analytics History
            </span>

          </a>

        </nav>

      </section>



      <!-- =================================================
           SETTINGS
           ================================================= -->

      <section class="sidebar-group sidebar-group-last">

        <h3 class="sidebar-section-title">
          SETTINGS
        </h3>


        <nav
          class="sidebar-nav"
          aria-label="Settings navigation"
        >


          <!-- ACCOUNT & SETTINGS -->

          <a
            href="#"
            class="nav-item"
            data-page="account"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ⚙
            </span>

            <span class="nav-label">
              Account & Settings
            </span>

          </a>


          <!-- HELP & SUPPORT -->

          <a
            href="#"
            class="nav-item"
            data-page="help"
          >

            <span
              class="nav-icon"
              aria-hidden="true"
            >
              ?
            </span>

            <span class="nav-label">
              Help & Support
            </span>

          </a>

        </nav>

      </section>



      <!-- =================================================
           SIDEBAR FOOTER
           ================================================= -->

      <div class="sidebar-footer">

        <div class="sidebar-footer-card">

          <div class="sidebar-footer-icon">
            ✦
          </div>


          <div class="sidebar-footer-content">

            <strong>
              ClipCraft
            </strong>

            <span>
              Video editing workspace
            </span>

          </div>

        </div>

      </div>


    </aside>

  `;
}