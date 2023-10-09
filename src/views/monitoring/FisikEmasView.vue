<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
import Table from "@/components/Table.vue";
import Filter from "@/components/Filter.vue";
import { ref } from "vue";

const table = ref(null);

function downloadTable() {
  table.value.ExportToExcel("xlsx");
}
</script>

<template>
  <div class="fisik-emas">
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
                <li class="breadcrumb-item active" aria-current="page">
                  Fisik Emas
                </li>
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
