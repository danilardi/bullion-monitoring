<script setup>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import Footer from "../components/Footer.vue";
import Filter from "../components/Filter.vue";

import LineChart from "../components/LineChart.vue";
</script>

<template>
  <div class="home">
    <Topbar />
    <div class="container-fluid page-body-wrapper">
      <Sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="page-header">
            <h3 class="page-title d-flex">
              <span
                class="d-flex page-title-icon bg-gradient-primary text-white me-2"
                ><i class="bi bi-house-door-fill"></i
              ></span>
              Dashboard
            </h3>
          </div>
          <!-- filter -->
          <div class="page-header">
            <span class="page-title d-flex">
              <Filter />
            </span>
          </div>
          <!-- content -->
          <div
            class="d-flex justify-content-sm-center justify-content-md-start"
          >
            <LineChart :route="'user'" />
            <LineChart :route="'gold'" />
            <LineChart :route="'gtm'" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
