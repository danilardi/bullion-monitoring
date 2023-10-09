<script setup>
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";

const selected = ref("1");
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());
const week = ref();
const date = ref();

onMounted(() => {
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
  date.value = [startDate, endDate];
});
</script>

<template>
  <i class="bi bi-funnel-fill me-2"></i>
  <select
    class="form-select me-2"
    aria-label="Default select example"
    v-model="selected"
  >
    <option value="1">Annual</option>
    <option value="2">Monthly</option>
    <option value="3">Weekly</option>
    <option value="4">Daily</option>
  </select>

  <!-- annual -->
  <VueDatePicker
    v-if="selected == 1"
    v-model="year"
    year-picker
    auto-apply
    reverse-years
    :max-date="new Date()"
    :year-range="[2000, 2023]"
  />
  <!-- monthly -->
  <VueDatePicker
    v-if="selected == 2"
    v-model="month"
    month-picker
    auto-apply
    :max-date="new Date()"
  />
  <!-- weekly -->
  <VueDatePicker
    v-if="selected == 3"
    v-model="week"
    week-picker
    auto-apply
    placeholder="Select week"
    :max-date="new Date()"
    :enable-time-picker="false"
  />
  <!-- daily -->
  <VueDatePicker
    v-if="selected == 4"
    v-model="date"
    range
    max-range="7"
    auto-apply
    placeholder="Can't have more than 7 days in between"
    :max-date="new Date()"
    :enable-time-picker="false"
  />
</template>
