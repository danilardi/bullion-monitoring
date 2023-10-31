<script setup>
import { computed } from "vue";
import { Line } from "vue-chartjs";

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

const props = defineProps({
  menuDb: Object,
  chartColor: Array,
});

const data = computed(() => {
  const menuData = props.menuDb;
  const labels = menuData.data[0].value.map((item) => item.time);

  const datasets = menuData.data.map((user) => ({
    label: user.platform,
    data: user.value.map((item) => parseInt(item.total)), // Extract and parse total values
    borderColor: props.chartColor[user.id - 1],
    backgroundColor: props.chartColor[user.id - 1],
  }));

  console.log("data", datasets);

  return {
    labels,
    datasets,
  };
});

const optionschart = computed(() => ({
  responsive: true,
}));
</script>

<template>
  <Line :data="data" :options="optionschart" />
</template>

<style scoped></style>
