<script setup>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import Footer from "../components/Footer.vue";
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
          <div class="row">
            <div class="col-md-7">
              <div class="card shadow card-product">
                <div class="card-body">
                  <h5 class="card-title">Visit Statistic</h5>
                  <p class="card-text"></p>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="card shadow card-product">
                <div class="card-body">
                  <h5 class="card-title">Visit Statistic</h5>
                  <p class="card-text"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
