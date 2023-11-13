<script setup></script>

<template>
  <nav class="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">
          <i class="bi bi-house menu-icon"></i>
          <span class="menu-title">Dashboard</span>
        </router-link>
      </li>
      <li class="nav-item">
        <div
          class="accordion accordion-flush"
          id="accordionPanelsStayOpenExample"
        >
          <div class="accordion-item">
            <div class="accordion-header">
              <button
                class="nav-link accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                <i class="bi bi-bar-chart-line menu-icon"></i>
                <span class="menu-title">Monitoring</span>
              </button>
            </div>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse show"
            >
              <div class="accordion-body">
                <li class="nav-tem">
                  <router-link class="nav-link" to="/monitoring/user">
                    <span class="menu-title">User</span>
                  </router-link>
                </li>
                <li class="nav-tem">
                  <router-link class="nav-link" to="/monitoring/fisikEmas">
                    <span class="menu-title">Fisik Emas</span>
                  </router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  min-height: calc(100vh - 70px);
  background: #fff;
  padding: 0;
  width: 260px;
  z-index: 11;
}
.nav {
  display: flex;
}
.sidebar .nav {
  flex-direction: column;
  padding: 0 2.25rem;
}

.sidebar .nav .nav-item .nav-link {
  display: flex;
  align-items: center;
  padding: 1.125rem 1rem;
  color: #3e4b5b;
}

.sidebar .nav .nav-item .nav-link .menu-title {
  font-size: 0.875rem;
  line-height: 1;
}

.sidebar .nav .nav-item .nav-link i.menu-icon {
  font-size: 1.125rem;
  line-height: 1;
  padding-right: 1rem;
  color: #3e4b5b;
}

.router-link-exact-active {
  color: black !important;
  font-weight: bold;
}

.router-link-exact-active i.menu-icon {
  padding-right: 1rem;
}

.accordion {
  --bs-accordion-btn-icon-transform: rotate(90deg) !important;
  --bs-accordion-btn-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E") !important;
  --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E") !important;
  --bs-accordion-active-bg: ;
  --bs-accordion-btn-focus-border-color: ;
  --bs-accordion-btn-focus-box-shadow: ;
}

.accordion-item:has(.router-link-exact-active) .accordion-header .menu-title {
  color: black !important;
  font-weight: bold;
}
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    right: -260px;
  }
}
</style>
