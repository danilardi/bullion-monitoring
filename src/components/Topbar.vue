<script setup></script>

<template>
  <nav class="navbar p-0 fixed-top">
    <div class="navbar-brand-wrapper">
      <a class="navbar-brand" href="#"
        ><i class="bi bi-stack logo me-2"></i>Bullion Monitoring</a
      >
    </div>
    <div class="navbar-menu-wrapper">
      <ul class="navbar-nav flex-row ms-auto align-items-center">
        <li class="nav-item"><i class="bi bi-person-circle menu-icon"></i></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  font-weight: 300;
  background: #fff;
}

.navbar .navbar-brand-wrapper {
  width: 260px;
  height: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.navbar .navbar-menu-wrapper {
  width: calc(100% - 260px);
  height: 70px;
  align-items: center;
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
</style>
