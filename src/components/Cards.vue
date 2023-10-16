<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const props = defineProps(["route"]);
const data = ref([]);

function setData(response) {
  let users = response.data;
  let temp = ref([]);
  users.forEach((users) => {
    users.data.forEach((usersData) => {
      usersData.value.forEach((value) => {
        temp.value.push({
          platform: usersData.platform,
          type: users.type,
          time: value.time,
          total: value.total,
        });
      });
    });
  });
  data.value.data = temp.value;
  data.value.type = [...new Set(temp.value.map((item) => item.type))];
  data.value.time = [...new Set(temp.value.map((item) => item.time))];
  data.value.platform = [...new Set(temp.value.map((item) => item.platform))];
  console.log(data.value);
}

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/" + props.route);
  setData(response);
});
</script>

<template>
  <div class="mb-4 d-md-none" v-for="(platf, platfIndex) in data.platform">
    <h4>{{ platf }}</h4>
    <div class="d-flex overflow-x-auto" style="scrollbar-width: thin">
      <div
        class="card m-3"
        style="min-width: 200px"
        v-for="(time, timeIndex) in data.time"
      >
        <div class="card-body">
          <h5 class="card-title text-center">{{ time }}</h5>
          <template v-for="(type, typeIndex) in data.type">
            <div class="d-flex justify-content-between">
              <p class="card-text">{{ type }}</p>
              <p>
                <b>{{
                  data.data[
                    timeIndex +
                      data.time.length * typeIndex * data.platform.length +
                      platfIndex * data.time.length
                  ].total
                }}</b>
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
