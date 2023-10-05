<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
import Table from "@/components/Table.vue";
import Filter from "@/components/Filter.vue";
import { ref } from "vue";

const table = ref(null);
const selected = ref("1");

function downloadTable() {
  table.value.ExportToExcel("xlsx");
}
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
                ><i class="bi bi-bar-chart-line-fill"></i
              ></span>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Monitoring</li>
                <li class="breadcrumb-item active" aria-current="page">User</li>
              </ol>
            </nav>
            <!-- Button Download -->
            <span>
              <button class="btn btn-success" @click="downloadTable">
                <i class="bi bi-filetype-csv me-2"></i>Download
              </button>
            </span>
          </div>

          <!-- filter -->
          <div class="page-header">
            <span class="page-title d-flex">
              <i class="bi bi-funnel-fill me-2"></i>
              <select
                class="form-select me-2"
                aria-label="Default select example"
                v-model="selected"
              >
                <option value="1">Annual</option>
                <option value="2">Monthly</option>
                <option value="3">Weekly</option>
                <option value="4">Daily</option>
              </select>

              <Filter :selected="selected" />
            </span>
          </div>
          <!-- content -->
          <Table :route="'users'" ref="table" />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
