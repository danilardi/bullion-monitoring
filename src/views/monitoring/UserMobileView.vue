<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";

import CardData from "../../../db.json";
import CardMobile from "@/components/CardsMobile.vue";

const dataUser = CardData.users;

console.log("dataUser", dataUser);
console.log("contentData", dataUser[0].data);
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
          <div class="mb-4">
            <h4>MetalGo</h4>
            <div class="d-flex overflow-x-auto" style="scrollbar-width: thin">
              <CardMobile v-for="item in dataUser[0].data[0].value" :month="item.time" :total="item.total" :data="dataUser" />
            </div>
          </div>
          <div class="mb-4">
            <h4>PosPayGold</h4>
            <div class="d-flex overflow-x-auto">
              <CardMobile v-for="item in dataUser[0].data[1].value" :month="item.time" :total="item.total" :data="dataUser" />
            </div>
          </div>
          <div class="mb-4">
            <h4>JFXGoldX</h4>
            <div class="d-flex overflow-x-auto">
              <CardMobile />
              <CardMobile />
              <CardMobile />
              <CardMobile />
              <CardMobile />
              <CardMobile />
              <CardMobile />
              <CardMobile />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
