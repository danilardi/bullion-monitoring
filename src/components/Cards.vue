<script setup>
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

await new Promise((res) => setTimeout(res, 2000));
</script>

<template>
  <!-- Show card for each platform -->
  <div class="mb-4 d-md-none" v-if="onMountedLoaded" v-for="platform in data.platform">
    <h4>{{ platform }}</h4>
    <div v-dragscroll class="d-flex overflow-x-auto">
      <!-- show card for each time -->
      <div class="card m-3" style="min-width: 200px" v-for="time in data.time">
        <div class="card-body">
          <h5 class="card-title text-center">{{ time }}</h5>
          <template v-for="tipe in data.type">
            <div class="d-flex justify-content-between">
              <p class="card-text">{{ tipe }}</p>
              <p>
                <!-- show data -->
                <b>{{ data.data[platform][time][tipe] }}</b>
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
