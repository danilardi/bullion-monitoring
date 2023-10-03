<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const data = ref([]);
const type = ref([]);
const time = ref([]);
const value = ref([]);

function setTime() {
  const timeData = data.value[0].data[0].value;
  time.value = timeData.map((item) => item.time);
}

function setType() {
  const typeData = data.value;
  type.value = typeData.map((item) => item.name);
}

function setValue() {
  const valueData = data.value;
  valueData.forEach((item) => {
    item.data.forEach((item) => {
      item.value.forEach((item) => {
        value.value.push(item.total);
      });
    });
  });
  console.log(value.value);
}

function countAll(a, b) {
  return Number(a) + Number(b);
}

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/users");
  data.value = response.data;
  setType();
  setTime();
  setValue();
});
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
          </div>

          <!-- content -->
          <div class="table-responsive">
            <table
              class="table table-striped table-hover table-bordered align-middle text-nowrap"
            >
              <thead>
                <tr>
                  <th scope="col" rowspan="2"></th>
                  <template v-for="index in time.length">
                    <th class="text-center" scope="col">JFXGoldX</th>
                    <th class="text-center" scope="col">MetalGO</th>
                    <th class="text-center" scope="col">PosPayGold</th>
                  </template>
                </tr>
                <tr>
                  <template v-for="item in time">
                    <th class="text-center" scope="col" colspan="3">
                      {{ item }}
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in type">
                  <th scope="row">{{ item }}</th>
                  <template v-for="j in time.length">
                    <td class="text-center">
                      {{
                        countAll(
                          value[j + time.length * 2 * i - 1],
                          value[j + time.length * 2 * i - 1 + time.length]
                        )
                      }}
                    </td>
                    <td class="text-center">
                      {{ value[j + time.length * 2 * i - 1] }}
                    </td>
                    <td class="text-center">
                      {{ value[j + time.length * 2 * i - 1 + time.length] }}
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
