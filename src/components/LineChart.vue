<script setup>
import { ref, computed, onMounted } from "vue";
import { Line } from "vue-chartjs";
import { useMonitoringStore } from "@/stores/monitoring";
import { clearText } from "../util/text";
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

const monitoringStore = useMonitoringStore();

const props = defineProps(["route"]);

const chartColor = ref(["#2aa198", "#a93278", "#3759b2"]);

const selected = ref("1");

const cek = ref({ data: [], dataLoad: false });

const data = computed(() => {
  return monitoringStore.getData(props.route);
});

const onMountedLoaded = computed(() => {
  if (data.value == null || data.value.data == null) {
    return false;
  } else {
    if (cek.value.dataLoad == false) {
      cek.value.dataLoad = true;
      cek.value.data = data.value.platform;
    }
    return true;
  }
});

const onDatasetLoaded = computed(() => {
  if (data.value.total == null) {
    return false;
  } else {
    return true;
  }
});

const dataChart = computed(() => {
  const labels = data.value.time;
  const datasets = [];
  data.value.total = {};

  if (data.value.data == null) {
    return {
      labels,
      datasets,
    };
  }

  cek.value.data.forEach((platform) => {
    const temp = [];
    Object.keys(data.value.data[platform]).forEach((time) => {
      temp.push(
        data.value.data[platform][time][data.value.type[selected.value - 1]]
      );
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

const optionschart = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
}));

onMounted(() => {
  monitoringStore.pushRoute(props.route);
  monitoringStore.fetchData();
});
</script>

<template>
  <div v-if="onMountedLoaded" class="card shadow card-product">
    <div class="card-body">
      <h5 class="card-title fw-bold">
        <i class="bi bi-person me-2"></i>{{ clearText(props.route) }} Details
      </h5>
      <div v-if="onMountedLoaded" class="d-flex m-2">
        <select class="form-select" aria-label="select type" v-model="selected">
          <template v-for="(tipe, index) in data.type">
            <option :value="index + 1">
              {{ clearText(tipe) }}
            </option>
          </template>
        </select>
      </div>

      <div
        class="btn-group d-flex justify-content-center"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <template v-for="(platform, index) in data.platform">
          <div class="form-check form-switch ms-4 me-4">
            <input
              type="checkbox"
              class="form-check-input"
              :id="`btncheck${index + 2}`"
              :value="platform"
              autocomplete="off"
              checked
              v-model="cek.data"
            />
            <label class="form-check-label" :for="`btncheck${index + 2}`">{{
              clearText(platform)
            }}</label>
          </div>
        </template>
      </div>

      <div
        class="d-flex ms-2 me-2 mt-3 mb-3 justify-content-center align-items-center"
      >
        <div
          class="d-flex align-items-center ms-4 me-4"
          v-for="platform in data.platform"
        >
          <div
            class="container-logo-platform d-flex align-items-center justify-content-center me-2"
          >
            <img
              class="logo-platform"
              :src="`../../assets/images/${platform}.png`"
            />
          </div>
          <div class="flex-row">
            <div class="fw-bold" v-if="onDatasetLoaded">
              {{ data.total[platform] }}
            </div>
            <div class="text-muted">Total</div>
          </div>
        </div>
      </div>
      <div style="height: 90%">
        <Line
          v-if="onMountedLoaded"
          :data="dataChart"
          :options="optionschart"
        />
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
