<script setup>
import { ref, computed } from "vue";
import { Line } from "vue-chartjs";

import { Chart, Legend, Title, Tooltip, LineController, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(Legend, Title, Tooltip, LineController, LineElement, PointElement, CategoryScale, LinearScale);

const dataValues = ref([
  [1, 3, 5, 7, 2, 4, 6],
  [1, 5, 2, 6, 3, 7, 4],
]);

const data = computed(() => ({
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

  datasets: [
    {
      label: "Foo",
      data: dataValues.value[0],
      backgroundColor: "#268bd2",
    },
    {
      label: "Line",
      data: dataValues.value[1],
      backgroundColor: "#2aa198",
    },
  ],
}));

const optionschart = computed(() => ({
  responsive: true,
}));
/*
Config = {
  type: "line",
  data: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    datasets: [
      {
        label: "Foo",
        data: dataValues.value[0],
        backgroundColor: "#268bd2",
      },
      {
        label: "Line",
        data: dataValues.value[1],
        backgroundColor: "#2aa198",
      },
    ],
  },
  options: {
    responsive: true,
  },
};
*/
</script>

<template>
  <Line :data="data" :options="optionsChart" />
</template>

<style scoped></style>
