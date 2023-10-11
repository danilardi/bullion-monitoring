<script setup>
import { computed } from "vue";
import { Bar } from "vue-chartjs";

import dbData from "../../db.json";

import { Chart, Legend, Title, Tooltip, BarController, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(BarController, Legend, Title, Tooltip, CategoryScale, LinearScale, BarElement);

const data = computed(() => {
  const usersData = dbData.users;
  const labels = usersData[0].data[0].value.map((item) => item.time);

  const datasets = usersData.map((user) => ({
    label: user.name,
    data: user.data[0].value.map((item) => parseInt(item.total)), // Extract and parse total values
    backgroundColor: "#2aa198",
  }));

  return {
    labels,
    datasets,
  };
});
</script>

<template>
  <Bar :data="data" />
</template>

<style scoped></style>
