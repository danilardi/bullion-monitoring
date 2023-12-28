<script setup>
import { ref, computed, onMounted } from "vue";
import { Line } from "vue-chartjs";
import { useMonitoringStore } from "@/stores/monitoring";
import { clearText, convertStringToNumber } from "../util/text";
import { Chart, Legend, Title, Tooltip, LineController, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(Legend, Title, Tooltip, LineController, LineElement, PointElement, CategoryScale, LinearScale);

const monitoringStore = useMonitoringStore();
const props = defineProps(["route"]); // route for get data from api
const chartColor = ref(["#2aa198", "#a93278", "#3759b2"]); // color for chart
const selected = ref("1"); // selected type
const filterPlatform = ref({ data: [], dataLoad: false }); // filter platform
const data = computed(() => {
  // data from api
  return monitoringStore.getData(props.route);
});

// check if data from api is loaded
const onMountedLoaded = computed(() => {
  if (data.value == null || data.value.data == null) {
    return false;
  } else {
    if (filterPlatform.value.dataLoad == false) {
      filterPlatform.value.dataLoad = true;
      filterPlatform.value.data = data.value.platform;
    }
    return true;
  }
});

// check if dataset from api is loaded
const onDatasetLoaded = computed(() => {
  if (data.value.total == null) {
    return false;
  } else {
    return true;
  }
});

// data for chart
const dataChart = computed(() => {
  const labels = data.value.time; // set label for chart
  const datasets = [];
  data.value.total = {};

  // check if data from api is null
  if (data.value.data == null) {
    return {
      labels,
      datasets,
    };
  }

  // set dataset for chart
  filterPlatform.value.data.forEach((platform) => {
    const temp = [];
    Object.keys(data.value.data[platform]).forEach((time) => {
      temp.push(data.value.data[platform][time][data.value.type[selected.value - 1]]);
    });

    const tempSum = temp.reduce((a, b) => a + b, 0);
    data.value.total[platform] = tempSum;

    datasets.push({
      label: platform,
      data: temp,
      borderColor: chartColor.value[data.value.platform.indexOf(platform)],
      backgroundColor: chartColor.value[data.value.platform.indexOf(platform)],
    });
  });

  return {
    labels,
    datasets,
  };
});

// options for chart
const optionschart = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}));

onMounted(() => {
  // push route to store
  monitoringStore.pushRoute(props.route);

  // fetch data from api
  monitoringStore.fetchData();
});

await new Promise((res) => setTimeout(res, 2000));
</script>

<template>
  <!-- render component if data loaded -->
  <div v-if="onMountedLoaded" class="card shadow card-product">
    <div class="card-body">
      <h5 class="card-title fw-bold">
        <!-- Chart Name -->
        <i class="bi bi-person me-2"></i>{{ clearText(props.route) }} Details
      </h5>
      <div v-if="onMountedLoaded" class="d-flex m-2">
        <!-- select the type to display -->
        <select class="form-select" aria-label="select type" v-model="selected">
          <template v-for="(tipe, index) in data.type">
            <option :value="index + 1">
              {{ clearText(tipe) }}
            </option>
          </template>
        </select>
      </div>

      <div class="btn-group d-flex justify-content-evenly align-items-center" role="group" aria-label="Basic checkbox toggle button group">
        <!-- checkbox for filter platform to display -->
        <template v-for="(platform, index) in data.platform">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" :id="`btncheck${index + 2}`" :value="platform" autocomplete="off" checked v-model="filterPlatform.data" />
            <label class="form-check-label" :for="`btncheck${index + 2}`">{{ clearText(platform) }}</label>
          </div>
        </template>
      </div>

      <!-- display total for each platform -->
      <div class="d-flex ms-2 me-2 mt-3 mb-3 justify-content-evenly align-items-center">
        <div class="d-flex align-items-center" v-for="platform in data.platform">
          <div class="container-logo-platform d-flex align-items-center justify-content-center me-2">
            <img class="logo-platform" :src="`../../assets/images/${platform}.png`" />
          </div>
          <div class="flex-row">
            <div class="fw-bold" v-if="onDatasetLoaded">
              {{ convertStringToNumber(data.total[platform]) }}
            </div>
            <div class="text-muted">Total</div>
          </div>
        </div>
      </div>

      <!-- display chart -->
      <div style="height: 90%">
        <Line v-if="onMountedLoaded" :data="dataChart" :options="optionschart" />
      </div>
    </div>
  </div>
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
