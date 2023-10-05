<script setup>
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";

const props = defineProps(["selected"]);

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
  <!-- annual -->
  <VueDatePicker
    v-if="selected == 1"
    v-model="year"
    year-picker
    auto-apply
    :max-date="new Date()"
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
  />
</template>
