<script setup>
import { ref, computed, onMounted } from "vue";
import * as XLSX from "xlsx";
import { useMonitoringStore } from "@/stores/monitoring";

const monitoringStore = useMonitoringStore();
const props = defineProps(["route"]);

const onMountedLoaded = ref(false);
const exportTable = ref(null);

const data = computed(() => {
  return monitoringStore.getData;
});

function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById("tbl_exporttable_to_xls");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MySheetName." + (type || "xlsx"));
}

onMounted(() => {
  monitoringStore.setRoute(props.route);
  monitoringStore.getDataFromAPI().then(() => {
    onMountedLoaded.value = true;
    // console.log(data.value.data);
  });
});

defineExpose({
  ExportToExcel,
});
</script>

<template>
  <div class="table-responsive d-none d-md-block">
    <table
      v-if="onMountedLoaded"
      id="tbl_exporttable_to_xls"
      class="table table-hover table-bordered align-middle text-nowrap"
    >
      <thead>
        <tr>
          <th scope="col" rowspan="2"></th>
          <template v-for="index in data.time">
            <th class="text-center" scope="col" v-for="item in data.platform">
              {{ item }}
            </th>
          </template>
        </tr>
        <tr>
          <template v-for="item in data.time">
            <td class="text-center" scope="col" colspan="3">
              {{ item }}
            </td>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr v-for="tipe in data.type">
          <th scope="row">{{ tipe }}</th>
          <template v-for="time in data.time">
            <td class="text-center" v-for="platform in data.platform">
              {{ data.data[platform][time][tipe] }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th:first-child {
  position: sticky;
  left: -1px;
}
</style>
