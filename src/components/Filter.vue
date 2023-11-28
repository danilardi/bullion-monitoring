<script setup>
import { ref, onMounted, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useMonitoringStore } from "@/stores/monitoring";
import { getWeeksInMonthOnYear } from "@/util/date";

const monitoringStore = useMonitoringStore();

const selected = ref();
const weeks = computed(() => {
  return getWeeksInMonthOnYear(
    monitoringStore.getMonth.year,
    monitoringStore.getMonth.month
  );
});

function cek() {
  monitoringStore.getDataFromAPI();
  console.log("data", weeks.value);
  console.log("selected", monitoringStore.getSelected);
  console.log("year", monitoringStore.getYear);
  console.log("month", monitoringStore.getMonth);
  console.log("week", monitoringStore.getWeek);
  console.log("date", monitoringStore.getDate);
}

onMounted(() => {
  selected.value = monitoringStore.getSelected;
});
</script>

<template>
  <i class="bi bi-funnel-fill me-2"></i>
  <select
    class="form-select me-2"
    aria-label="select filter"
    v-model="monitoringStore.selected"
  >
    <option value="1">Annual</option>
    <option value="2">Monthly</option>
    <option value="3">Weekly</option>
    <option value="4">Daily</option>
  </select>

  <!-- annual -->
  <VueDatePicker
    v-if="monitoringStore.getSelected == 1"
    v-model="monitoringStore.year"
    year-picker
    auto-apply
    reverse-years
    :max-date="new Date()"
    :year-range="[2000, 2023]"
  />
  <!-- monthly -->
  <VueDatePicker
    v-if="monitoringStore.getSelected == 2 || monitoringStore.getSelected == 3"
    v-model="monitoringStore.month"
    placeholder="Select month"
    month-picker
    auto-apply
    :max-date="new Date()"
  />
  <!-- weekly -->
  <!-- <VueDatePicker
    v-if="monitoringStore.getSelected == 3"
    v-model="monitoringStore.week"
    auto-apply
    placeholder="Select week"
    :max-date="new Date()"
    :enable-time-picker="false"
  /> -->
  <select
    v-if="monitoringStore.getSelected == 3"
    class="form-select ms-2"
    aria-label="select week"
    v-model="monitoringStore.week"
  >
    <template v-for="(item, index) in weeks">
      <option :value="index + 1">Week {{ index + 1 }}</option>
    </template>
  </select>
  <!-- daily -->
  <VueDatePicker
    v-if="monitoringStore.getSelected == 4"
    v-model="monitoringStore.date"
    range
    max-range="6"
    auto-apply
    placeholder="Can't have more than 6 days in between"
    :max-date="new Date()"
    :enable-time-picker="false"
  />

  <span>
    <button class="btn btn-success ms-2" @click.prevent="cek">Filter</button>
  </span>
</template>
