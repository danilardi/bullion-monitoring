<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="home">
    <Topbar />
    <div class="container-fluid page-body-wrapper">
      <Sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <!-- breadcrumb -->
          <div class="page-header">
            <nav class="page-title d-flex" aria-label="breadcrumb">
              <span
                class="d-flex page-title-icon bg-gradient-primary text-white me-2"
                ><i class="bi bi-house-door-fill"></i
              ></span>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Monitoring</li>
                <li class="breadcrumb-item active" aria-current="page">User</li>
              </ol>
            </nav>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
