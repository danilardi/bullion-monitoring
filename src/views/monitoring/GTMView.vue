<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
import Table from "@/components/Table.vue";
import Cards from "@/components/Cards.vue";
import Filter from "@/components/Filter.vue";
import LineChart from "@/components/LineChart.vue";

import { ref } from "vue";

const table = ref(null); // ref to table component
const route = ref("gtm");

// download table
function downloadTable() {
  table.value.ExportToExcel("xlsx");
}
</script>

<template>
  <div class="monitoring">
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
                ><i class="bi bi-bar-chart-line-fill"></i
              ></span>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Monitoring</li>
                <li class="breadcrumb-item active" aria-current="page">User</li>
              </ol>
            </nav>
            <!-- Button Download table-->
            <span>
              <button class="btn btn-success" @click="downloadTable">
                <i class="bi bi-filetype-csv me-2"></i>Download
              </button>
            </span>
          </div>

          <!-- filter -->
          <div class="page-header">
            <span class="page-title d-flex">
              <Filter />
            </span>
          </div>
          <!-- content -->
          <Table :route="route" ref="table" />
          <Cards :route="route" />

          <!-- Chart -->
          <div class="d-flex justify-content-center mt-5">
            <LineChart :route="route" style="width: 80%" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
