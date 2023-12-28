<script setup>
import AnimatedPlaceholder from "../components/AnimatedPlaceholder.vue";

import { computed } from "vue";
import { useMonitoringStore } from "@/stores/monitoring";

const monitoringStore = useMonitoringStore();
const props = defineProps(["route"]);

const data = computed(() => {
  return monitoringStore.getData(props.route);
});

const onMountedLoaded = computed(() => {
  if (data.value == null || data.value.data == null) {
    return false;
  } else {
    return true;
  }
});
</script>

<template>
  <!-- Show card for each platform -->
  <div class="mb-4 d-md-none" v-for="n in 3">
    <AnimatedPlaceholder height="26px" width="135px" />
    <div v-dragscroll class="d-flex overflow-x-auto">
      <!-- show card for each time -->
      <div class="card m-3" style="min-width: 200px; height: 145px" v-for="n in 12">
        <div class="card-body">
          <div class="card-title text-center"><AnimatedPlaceholder height="24px" width="100px" /></div>

          <div class="d-flex justify-content-between">
            <p class="card-text"><AnimatedPlaceholder height="24px" width="100px" /></p>
            <p>
              <!-- show data -->
              <b><AnimatedPlaceholder height="24px" width="36px" /></b>
            </p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="card-text"><AnimatedPlaceholder height="24px" width="100px" /></p>
            <p>
              <!-- show data -->
              <b><AnimatedPlaceholder height="24px" width="36px" /></b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
