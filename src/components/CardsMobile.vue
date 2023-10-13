<script setup>
import CardContent from "../components/CardsContent.vue";

const props = defineProps({
  month: String,
  monthIndex: Number,
  platformIndex: Number,
  data: Array,
});
</script>

<template>
  <div class="card m-3" style="min-width: 300px">
    <div class="card-body">
      <h5 class="card-title text-center">{{ month }}</h5>
      <div class="">
        <CardContent v-for="(type, typeIndex) in props.data" :content="type.name" :total="props.data[typeIndex].data[platformIndex].value[monthIndex].total" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
