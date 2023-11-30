<script setup>
import { ref, onMounted, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useMonitoringStore } from "@/stores/monitoring";

const monitoringStore = useMonitoringStore();

const selected = ref();
const datepicker = ref(null);

const handleMonthYear = ({ instance, month, year }) => {
  // console.log("month", month);
  // console.log("year", year);
  monitoringStore.setWeek(month, year);
};

const handleInternal = (date) => {
  // console.log("date", date);
  monitoringStore.setDate(date);
};

function filter() {
  monitoringStore.fetchData();
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
    @update-month-year="handleMonthYear"
    :max-date="new Date()"
  />
  <!-- weekly -->
  <VueDatePicker
    v-if="monitoringStore.getSelected == 3"
    v-model="monitoringStore.week"
    week-picker
    auto-apply
    ref="datepicker"
    placeholder="Select week"
    disable-month-year-select
    :max-date="new Date()"
    :enable-time-picker="false"
    @internal-model-change="handleInternal"
  />

  <!-- daily -->
  <VueDatePicker
    v-if="monitoringStore.getSelected == 4"
    v-model="monitoringStore.date"
    range
    max-range="6"
    auto-apply
    placeholder="Max range 6 days"
    :max-date="new Date()"
    :enable-time-picker="false"
  />

  <span>
    <button class="btn btn-success ms-2" @click.prevent="filter">Filter</button>
  </span>
</template>
