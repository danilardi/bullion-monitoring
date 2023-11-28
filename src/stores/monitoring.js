import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import request from '@/util/request'
import { getMonthName, getWeekInMonth } from '@/util/date'

export const useMonitoringStore = defineStore('monitoring', () => {

    const data = ref([]);
    const route = ref();
    const selected = ref("1");
    const year = ref(new Date().getFullYear());
    const month = ref({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });
    const week = ref("1");
    const date = ref();

    const getData = computed(() => data.value)
    const getRoute = computed(() => route.value)
    const getSelected = computed(() => selected.value)
    const getYear = computed(() => year.value)
    const getMonth = computed(() => month.value)
    const getWeek = computed(() => week.value)
    const getDate = computed(() => date.value)

    async function getDataFromAPI() {
        let url = `/dashboard/${route.value}`

        // console.log("tes", getMonthName(week.value[0].getMonth()).toLowerCase())

        switch (selected.value) {
            case "1":
                url += `/${year.value}`
                break;
            case "2":
                url += `/${month.value.year}/${getMonthName(month.value.month).toLowerCase()}`
                break;
            case "3":
                url += `/${month.value.year}/${getMonthName(month.value.month).toLowerCase()}/week/${week.value}`
                break;
            case "4":
                url += `/${year.value}/${month.value}/${week.value}/${date.value}`
                break;
        }
        console.log("url", url)
        const resp = await request({
            url: url,
            method: 'get',
        })

        setData(resp)
    }

    function setData(response) {
        data.value = response
        data.value.platform = Object.keys(response.data)
        data.value.time = Object.keys(response.data[data.value.platform[0]])
        data.value.type = Object.keys(response.data[data.value.platform[0]][data.value.time[0]])
    }

    function setSelected(value) {
        selected.value = value
    }

    function setRoute(value) {
        route.value = value
    }

    return {
        data,
        selected,
        year,
        month,
        week,
        date,
        getData,
        getRoute,
        getSelected,
        getYear,
        getMonth,
        getWeek,
        getDate,
        getDataFromAPI,
        setData,
        setSelected,
        setRoute
    }
})