<script setup>
import { ref, computed, onMounted } from "vue";
import { Line } from "vue-chartjs";
import { useMonitoringStore } from "@/stores/monitoring";

const monitoringStore = useMonitoringStore();

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
const onMountedLoaded = ref(false);
const onDatasetLoaded = ref(false);

const data = computed(() => {
  return monitoringStore.getData;
});

const dataChart = computed(() => {
  const labels = data.value.time;
  const datasets = [];
  data.value.total = {};

  Object.keys(data.value.data).forEach((platform) => {
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

  onDatasetLoaded.value = true;

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
  monitoringStore.getDataFromAPI(props.route, 2023).then(() => {
    onMountedLoaded.value = true;
  });
});
</script>

<template>
  <div class="d-flex m-2">
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="selected"
    >
      <template v-for="(tipe, index) in data.type">
        <option :value="index + 1">
          {{ tipe }}
        </option>
      </template>
    </select>
  </div>
  <div
    class="d-flex ms-2 me-2 mt-3 mb-3 justify-content-between align-items-center"
  >
    <div class="d-flex align-items-center" v-for="platform in data.platform">
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
  <Line v-if="onMountedLoaded" :data="dataChart" :options="optionschart" />
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
