import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import request from '@/util/request'

export const useAuthStore = defineStore('auth', () => {
    const access_token = ref(JSON.parse(localStorage.getItem('auth')).access_token ?? '[]')
    const username = ref(JSON.parse(localStorage.getItem('auth')).username ?? '[]')
    const fullname = ref(JSON.parse(localStorage.getItem('auth')).fullname ?? '[]')
    const role = ref(JSON.parse(localStorage.getItem('auth')).role ?? '[]')

    const getAccessToken = computed(() => access_token.value)
    const getUsername = computed(() => username.value)
    const getFullname = computed(() => fullname.value)
    const getRole = computed(() => role.value)

    async function login(username, password, clientCaptchaKey) {
        const resp = await request({
            url: '/auth/login',
            method: 'post',
            data: {
                username,
                password,
                clientCaptchaKey
            },
        })
        this.SET_AUTH(resp)
    }

    async function cek(year) {
        const resp = await request({
            url: `/dashboard/gold/${year}`,
            method: 'get',
        })
        console.log('resp', resp)
    }

    function logout() {
        this.REMOVE_AUTH()
    }

    function SET_AUTH(resp) {
        access_token.value = resp.data.token
        username.value = resp.data.user.username
        fullname.value = resp.data.user.fullname
        role.value = resp.data.user.role
    }

    function REMOVE_AUTH() {
        access_token.value = ''
        username.value = ''
        fullname.value = ''
        role.value = ''
    }

    function SET_LOGIN_PROFILE(payload) {
        username.value = payload.username
        fullname.value = payload.fullname
        role.value = payload.role
    }

    return {
        access_token,
        username,
        fullname,
        role,
        getAccessToken,
        getUsername,
        getFullname,
        getRole,
        login,
        logout,
        cek,
        SET_AUTH,
        SET_LOGIN_PROFILE,
        REMOVE_AUTH
    }
})