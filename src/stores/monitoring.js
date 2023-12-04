import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import request from '@/util/request'
import { getMonthName, convertDate } from '@/util/date'

export const useMonitoringStore = defineStore('monitoring', () => {

    // state
    const data = ref({});
    const route = ref([]) // ["user", "gold", ...]
    const selected = ref("1"); // selected filter, 1 = annual, 2 = monthly, 3 = weekly, 4 = daily
    const year = ref(new Date().getFullYear()); // selected year, {2023}
    const month = ref({         // selected month, {October, 2023}
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });
    const week = ref(); // selected week, {2023-10-01, 2023-10-03}
    const date = ref(); // selected date, {2023-10-01, 2023-10-03}

    // getter
    const getSelected = computed(() => selected.value)
    const getYear = computed(() => year.value)
    const getMonth = computed(() => month.value)
    const getWeek = computed(() => week.value)
    const getDate = computed(() => date.value)

    // action
    function getData(route) {
        return data.value[route]
    }

    // set week in first week of month
    function setMonthYearInWeek(month, year) {
        let firstDate = new Date(year, month, 1) // first date of month
        let lastDate = new Date(year, month, 7 - new Date(year, month, 0).getDay()) // last date in first week of month
        week.value = [firstDate, lastDate]
    }

    // handle condition when take a week for the first or last week of month
    function setWeek(date) {
        if (date == null) {
            return
        }
        if (date[0].getMonth() != month.value.month) {  // if first date of week is not in selected month
            week.value[0] = new Date(month.value.year, month.value.month) // first date in week = first date of month
        } else if (date[1].getMonth() != month.value.month) { // if last date of week is not in selected month
            week.value[1] = new Date(month.value.year, month.value.month + 1, 0) // last date in week = last date of month
        }
    }

    function fetchData() {
        route.value.forEach(async (route) => {
            let url = `/dashboard/${route}`
            switch (selected.value) {
                case "1":
                    // {{base_url}}/v1/dashboard/{route}/2023
                    url += `/${year.value}`
                    break;
                case "2":
                    // {{base_url}}/v1/dashboard/{route}/2023/october
                    url += `/${month.value.year}/${getMonthName(month.value.month).toLowerCase()}`
                    break;
                case "3":
                    // {{base_url}}/v1/dashboard/{route}/daily?from=2023-10-01&to=2023-10-03
                    url += `/daily?from=${convertDate(week.value[0])}&to=${convertDate(week.value[1])}`
                    break;
                case "4":

                    // {{base_url}}/v1/dashboard/{route}/daily?from=2023-10-01&to=2023-10-03
                    url += `/daily?from=${convertDate(date.value[0])}&to=${convertDate(date.value[1])}`
                    break;
            }

            const resp = await request({
                url: url,
                method: 'get',
            })

            setData(resp, route)
        })
    }

    function setData(response, route) {
        if (Object.keys(response.data) == 0) { // if data is empty
            data.value = {}
            return
        } else {
            data.value[route] = response
            data.value[route].platform = Object.keys(response.data) // ["metalgo", "pospaygold", ...]
            if (Object.keys(data.value[route].data[data.value[route].platform[0]]).length == 0) { // if data is empty
                data.value = {}
                return
            }
            data.value[route].time = Object.keys(response.data[data.value[route].platform[0]]) // ["january", "februari", ...]
            data.value[route].type = Object.keys(response.data[data.value[route].platform[0]][data.value[route].time[0]]) // ["new basic user", "new full user", ...]
        }
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
        setMonthYearInWeek,
        setWeek,
        pushRoute
    }
})