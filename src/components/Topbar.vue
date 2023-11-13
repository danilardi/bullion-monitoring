<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const $router = useRouter();
const $toast = useToast();
const authStore = useAuthStore();

function logout() {
  authStore.logout();
  $router.push({ path: "/auth/login" });
  $toast.success("Sukses Logout", {
    type: "success",
    position: "top-right",
    duration: 3000,
    dismissible: true,
  });
}
</script>

<template>
  <nav class="navbar navbar-expand-md bg-body-tertiary fixed-top p-0 d-flex">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#navbarOffcanvasLg"
      aria-controls="navbarOffcanvasLg"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-brand-wrapper">
      <a class="navbar-brand" href="#"
        ><i class="bi bi-stack logo me-2"></i>Bullion Monitoring</a
      >
    </div>
    <div class="navbar-menu-wrapper flex-md-fill">
      <ul class="navbar-nav flex-row ms-auto align-items-center">
        <li class="nav-item">
          <button
            class="btn btn-danger btn-lg btn-block"
            type="submit"
            @click.prevent="logout"
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
    <div
      class="offcanvas offcanvas-start d-md-none"
      tabindex="-1"
      id="navbarOffcanvasLg"
      aria-labelledby="navbarOffcanvasLgLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
          Bullion Monitoring
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
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
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  font-weight: 300;
  background: #fff;
  width: 100vw;
}

.navbar .navbar-brand-wrapper {
  width: 260px;
  height: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.navbar .navbar-menu-wrapper {
  height: 70px;
  display: flex;
}

.navbar .navbar-brand-wrapper .navbar-brand {
  font-size: 1.5rem;
  line-height: 48px;
  padding: 0.25rem 0;
  width: 100%;
  display: contents;
}

.navbar .navbar-brand-wrapper .navbar-brand .logo {
  color: #4eb883;
}

.nav-item {
  margin-right: 1rem;
  font-size: 1.5rem;
}

.nav-item i.menu-icon {
  color: #3e4b5b;
}

.navbar-nav .nav-item .nav-link {
  display: flex;
  align-items: center;
  padding: 1.125rem 1rem;
  color: #3e4b5b;
}

.navbar-nav .nav-item .nav-link .menu-title {
  font-size: 0.875rem;
  line-height: 1;
}

.navbar-nav .nav-item .nav-link i.menu-icon {
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
</style>
