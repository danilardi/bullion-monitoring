<script setup>
import { ref, computed, onMounted } from "vue";
import { Line } from "vue-chartjs";
import axios from "axios";

import {
  Chart,
  Legend,
  Title,
  Tooltip,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(
  Legend,
  Title,
  Tooltip,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const props = defineProps(["route"]);

const chartColor = ref(["#2aa198", "#a93278", "#3759b2"]);

const selected = ref("1");
const menuDb = ref([]);
const onMountedLoaded = ref(false);

const data = computed(() => {
  const menuData = menuDb.value[selected.value - 1];
  const labels = menuData.data[0].value.map((item) => item.time);

  const datasets = menuData.data.map((user) => ({
    label: user.platform,
    data: user.value.map((item) => parseInt(item.total)), // Extract and parse total values
    borderColor: chartColor.value[user.id - 1],
    backgroundColor: chartColor.value[user.id - 1],
  }));

  console.log("data", datasets);

  return {
    labels,
    datasets,
  };
});

const optionschart = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}));

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/" + props.route);
  onMountedLoaded.value = true;
  menuDb.value = response.data;
});
</script>

<template>
  <div class="d-flex m-2">
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="selected"
    >
      <template v-for="(item, index) in menuDb">
        <option :value="index + 1">
          {{ item.type }}
        </option>
      </template>
    </select>
  </div>
  <div
    class="d-flex ms-2 me-2 mt-3 mb-3 justify-content-between align-items-center"
  >
    <div class="d-flex align-items-center">
      <div
        class="container-logo-platform d-flex align-items-center justify-content-center me-2"
      >
        <img class="logo-platform" src="assets/images/metalgo.png" />
      </div>
      <div class="flex-row">
        <div class="fw-bold">3125</div>
        <div class="text-muted">Total</div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div
        class="container-logo-platform d-flex align-items-center justify-content-center me-2"
      >
        <img class="logo-platform" src="assets/images/pospaygold.png" />
      </div>
      <div class="flex-row">
        <div class="fw-bold">3125</div>
        <div class="text-muted">Total</div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div
        class="container-logo-platform d-flex align-items-center justify-content-center me-2"
      >
        <img class="logo-platform" src="assets/images/jfxgold.png" />
      </div>
      <div class="flex-row">
        <div class="fw-bold">3125</div>
        <div class="text-muted">Total</div>
      </div>
    </div>
  </div>
  <Line v-if="onMountedLoaded" :data="data" :options="optionschart" />
</template>

<style scoped>
.container-logo-platform {
  width: 40px;
  height: 40px;
  background-color: rgb(162, 247, 247);
  border-radius: 10px;
}
.logo-platform {
  width: 80%;
  height: 80%;
  object-fit: contain;
}
</style>
