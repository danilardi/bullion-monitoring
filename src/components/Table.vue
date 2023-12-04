<script setup>
import { ref, computed, onMounted } from "vue";
import * as XLSX from "xlsx";
import { useMonitoringStore } from "@/stores/monitoring";
import { clearText, convertStringToNumber } from "../util/text";

const monitoringStore = useMonitoringStore();
const props = defineProps(["route"]);

const onMountedLoaded = computed(() => {
  if (data.value == null || data.value.data == null) {
    return false;
  } else {
    return true;
  }
});

const data = computed(() => {
  return monitoringStore.getData(props.route);
});

function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById("tbl_exporttable_to_xls");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MySheetName." + (type || "xlsx"));
}

defineExpose({
  ExportToExcel,
});
</script>

<template>
  <div v-if="!onMountedLoaded">Data Null</div>
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
              {{ clearText(item) }}
            </th>
          </template>
        </tr>
        <tr>
          <template v-for="item in data.time">
            <td class="text-center" scope="col" colspan="3">
              {{ clearText(item) }}
            </td>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr v-for="tipe in data.type">
          <th scope="row">{{ clearText(tipe) }}</th>
          <template v-for="time in data.time">
            <td class="text-center" v-for="platform in data.platform">
              {{ convertStringToNumber(data.data[platform][time][tipe]) }}
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
