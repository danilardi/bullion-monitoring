import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import request from '@/util/request'
import { getMonthName, convertDate } from '@/util/date'

export const useMonitoringStore = defineStore('monitoring', () => {

    const data = ref({});
    const route = ref([])
    const selected = ref("1");
    const year = ref(new Date().getFullYear());
    const month = ref({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });
    const week = ref();
    const date = ref();

    const getSelected = computed(() => selected.value)
    const getYear = computed(() => year.value)
    const getMonth = computed(() => month.value)
    const getWeek = computed(() => week.value)
    const getDate = computed(() => date.value)

    function getData(route) {
        return data.value[route]
    }

    function setWeek(month, year) {
        // console.log("set week")
        let firstDate = new Date(year, month, 1)
        let lastDate = new Date(year, month, 7 - new Date(year, month, 0).getDay())
        week.value = [firstDate, lastDate]
    }

    function setDate(date) {
        // console.log("set date", date)
        if (date == null) {
            // console.log("date null")
            return
        }
        if (date[0].getMonth() != month.value.month) {
            week.value[0] = new Date(month.value.year, month.value.month)
        } else if (date[1].getMonth() != month.value.month) {
            week.value[1] = new Date(month.value.year, month.value.month + 1, 0)
        }
    }

    function fetchData() {
        route.value.forEach(async (route) => {
            let url = `/dashboard/${route}`

            // console.log("tes", date.value)

            switch (selected.value) {
                case "1":
                    url += `/${year.value}`
                    break;
                case "2":
                    url += `/${month.value.year}/${getMonthName(month.value.month).toLowerCase()}`
                    break;
                case "3":
                    let startDate = convertDate(week.value[0])
                    let endDate = convertDate(week.value[1])
                    url += `/daily?from=${startDate}&to=${endDate}`
                    break;
                case "4":
                    // {{base_url}}/v1/dashboard/user/daily?from=2023-10-01&to=2023-10-03
                    url += `/daily?from=${convertDate(date.value[0])}&to=${convertDate(date.value[1])}`
                    break;
            }
            console.log("url", url)
            const resp = await request({
                url: url,
                method: 'get',
            })

            setData(resp, route)
        })
    }

    function setData(response, route) {
        // console.log("cek", response.data)

        if (Object.keys(response.data) == 0) {
            // console.log("data null")
            data.value = {}
            return
        } else {
            // console.log(route)
            data.value[route] = response
            data.value[route].platform = Object.keys(response.data)
            if (Object.keys(data.value[route].data[data.value[route].platform[0]]).length == 0) {
                // console.log("data null")
                data.value = {}
                return
            }
            // console.log("data not null")
            // console.log("1")
            data.value[route].time = Object.keys(response.data[data.value[route].platform[0]])
            data.value[route].type = Object.keys(response.data[data.value[route].platform[0]][data.value[route].time[0]])

        }
        // console.log("data", data.value)
    }

    function setSelected(value) {
        selected.value = value
    }

    function pushRoute(value) {
        route.value.push(value)
    }

    return {
        data,
        selected,
        year,
        month,
        week,
        date,
        getSelected,
        getYear,
        getMonth,
        getWeek,
        getDate,
        getData,
        fetchData,
        setData,
        setSelected,
        setWeek,
        setDate,
        pushRoute
    }
})