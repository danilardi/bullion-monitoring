<script setup>
import CardContent from "../components/CardsContent.vue";

const props = defineProps({
  month: String,
  total: String,
  data: Array,
});
</script>

<template>
  <div class="card m-3" style="min-width: 400px">
    <div class="card-body">
      <h5 class="card-title text-center">{{ month }}</h5>
      <div class="">
        <CardContent v-for="item in props.data" :content="item.name" :total="props.total" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
