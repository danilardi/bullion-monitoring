<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";

const props = defineProps(["route"]);
const data = ref([]);
const exportTable = ref(null);

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

function countAll(a, b) {
  return Number(a) + Number(b);
}

function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById("tbl_exporttable_to_xls");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MySheetName." + (type || "xlsx"));
}
onMounted(async () => {
  const response = await axios.get("http://localhost:3000/" + props.route);
  setData(response);
});

defineExpose({
  ExportToExcel,
});
</script>

<template>
  <div class="table-responsive">
    <table
      id="tbl_exporttable_to_xls"
      class="table table-striped table-hover table-bordered align-middle text-nowrap"
    >
      <thead>
        <tr>
          <th scope="col" rowspan="2"></th>
          <template v-for="index in data.time">
            <th class="text-center" scope="col">JFXGoldX</th>
            <th class="text-center" scope="col" v-for="item in data.platform">
              {{ item }}
            </th>
          </template>
        </tr>
        <tr>
          <template v-for="item in data.time">
            <th class="text-center" scope="col" colspan="3">
              {{ item }}
            </th>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, i) in data.type">
          <th scope="row">{{ item }}</th>
          <template v-for="j in data.time.length">
            <td class="text-center">
              {{
                countAll(
                  data.data[j + data.time.length * 2 * i - 1].total,
                  data.data[j + data.time.length * 2 * i - 1 + data.time.length]
                    .total
                )
              }}
            </td>
            <td class="text-center">
              {{ data.data[j + data.time.length * 2 * i - 1].total }}
            </td>
            <td class="text-center">
              {{
                data.data[j + data.time.length * 2 * i - 1 + data.time.length]
                  .total
              }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
