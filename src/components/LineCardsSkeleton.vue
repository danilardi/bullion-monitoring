<script setup>
import AnimatedPlaceholder from "../components/AnimatedPlaceholder.vue";
</script>

<template>
  <!-- render component if data loaded -->
  <div class="card shadow card-product">
    <div class="card-body">
      <h5 class="card-title fw-bold">
        <!-- Chart Name -->
        <AnimatedPlaceholder height="24px" width="200px" />
      </h5>
      <div class="d-flex m-2">
        <!-- select the type to display -->
        <AnimatedPlaceholder height="35px" width="450px" />
      </div>

      <div class="d-flex justify-content-evenly align-items-center" role="group" aria-label="Basic checkbox toggle button group">
        <!-- checkbox for filter platform to display -->
        <AnimatedPlaceholder height="24px" width="100px" />
        <AnimatedPlaceholder height="24px" width="100px" />
        <AnimatedPlaceholder height="24px" width="100px" />
      </div>

      <!-- display total for each platform -->
      <div class="d-flex ms-2 me-2 mt-3 mb-3 justify-content-evenly align-items-center">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center justify-content-center me-2">
            <AnimatedPlaceholder height="40px" width="40px" border-radius="15%" />
          </div>
          <div class="d-flex flex-column">
            <AnimatedPlaceholder height="20px" width="70px" />
            <AnimatedPlaceholder height="18px" width="50px" />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center justify-content-center me-2">
            <AnimatedPlaceholder height="40px" width="40px" border-radius="15%" />
          </div>
          <div class="d-flex flex-column">
            <AnimatedPlaceholder height="20px" width="70px" />
            <AnimatedPlaceholder height="18px" width="50px" />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center justify-content-center me-2">
            <AnimatedPlaceholder height="40px" width="40px" border-radius="15%" />
          </div>
          <div class="d-flex flex-column">
            <AnimatedPlaceholder height="20px" width="70px" />
            <AnimatedPlaceholder height="18px" width="50px" />
          </div>
        </div>
      </div>

      <!-- display chart -->
      <div class="ratio" style="--bs-aspect-ratio: 50%">
        <AnimatedPlaceholder height="100%" width="100%" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-platform {
  width: 80%;
  height: 80%;
  object-fit: contain;
}
</style>
