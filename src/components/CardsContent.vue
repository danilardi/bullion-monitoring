<script setup>
const props = defineProps({
  content: String,
  total: String,
});
</script>

<template>
  <div class="d-flex justify-content-between">
    <p class="card-text">{{ content }}</p>
    <p>
      <b>{{ total }}</b>
    </p>
  </div>
</template>

<style scoped></style>
