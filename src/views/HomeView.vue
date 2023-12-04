<script setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import Footer from "../components/Footer.vue";
import Filter from "../components/Filter.vue";
import LineChart from "../components/LineChart.vue";

const route = ref(["user", "gold", "metalpay", "gtm", "ticketing", "ziswaf"]); // route monitoring
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

          <!-- filter button-->
          <div class="page-header">
            <span class="page-title d-flex">
              <Filter />
            </span>
          </div>

          <!-- content -->
          <div class="d-flex flex-row flex-wrap justify-content-center">
            <!-- load linechart for all route -->
            <template v-for="item in route">
              <LineChart :route="item" class="m-3" style="width: 500px" />
            </template>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
