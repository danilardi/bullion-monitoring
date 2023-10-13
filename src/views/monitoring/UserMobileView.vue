<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";

import CardData from "../../../db.json";
import CardMobile from "@/components/CardsMobile.vue";

const dataUser = CardData.users;

const platformData = dataUser[0].data;
const monthData = dataUser[0].data[0].value;

console.log("dataUser", dataUser);
console.log("monthData", monthData);
console.log("platformDatad", platformData);
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
              <span class="d-flex page-title-icon bg-gradient-primary text-white me-2"><i class="bi bi-bar-chart-line-fill"></i></span>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Monitoring</li>
                <li class="breadcrumb-item active" aria-current="page">User Mobile Tes</li>
              </ol>
            </nav>
          </div>

          <!-- content -->
          <div class="mb-4" v-for="(platf, platfIndex) in platformData">
            <h4>{{ platf.platform }}</h4>
            <div class="d-flex overflow-x-auto" style="scrollbar-width: thin">
              <CardMobile v-for="(month, monIndex) in monthData" :month="month.time" :monthIndex="monIndex" :platformIndex="platfIndex" :data="dataUser" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
