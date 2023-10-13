<script setup>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import Footer from "../components/Footer.vue";

import LineChart from "../components/LineChart.vue";

import dataBase from "../../db.json";

const dataUser = dataBase.users;
const chartColor = ["#2aa198", "#a93278", "#3759b2"];

console.log("db", dataUser);
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
              <span class="d-flex page-title-icon bg-gradient-primary text-white me-2"><i class="bi bi-house-door-fill"></i></span>
              Dashboard
            </h3>
          </div>
          <div class="row">
            <div class="col-md-5" v-for="menu in dataUser">
              <div class="card shadow card-product">
                <div class="card-body">
                  <h5 class="card-title">Visit Statistic {{ menu.name }}</h5>
                  <p class="card-text"></p>
                  <div>
                    <LineChart :menuDb="menu" :chartColor="chartColor" />
                  </div>
                  <Chart />
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
