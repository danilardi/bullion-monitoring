import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import request from '@/util/request'

export const useAuthStore = defineStore('auth', () => {

    if (localStorage.getItem('auth') == null) {
        localStorage.setItem('auth', JSON.stringify({
            access_token: '',
            fullname: '',
        }))
    }
    const access_token = ref(JSON.parse(localStorage.getItem('auth')).access_token)
    const fullname = ref(JSON.parse(localStorage.getItem('auth')).fullname)

    const getAccessToken = computed(() => access_token.value)
    const getFullname = computed(() => fullname.value)

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

    function logout() {
        this.REMOVE_AUTH()
    }

    function SET_AUTH(resp) {
        access_token.value = resp.data.token
        fullname.value = resp.data.user.fullname
    }

    function REMOVE_AUTH() {
        access_token.value = ''
        fullname.value = ''
    }

    function SET_LOGIN_PROFILE(payload) {
        fullname.value = payload.fullname
    }

    return {
        access_token,
        fullname,
        getAccessToken,
        getFullname,
        login,
        logout,
        SET_AUTH,
        SET_LOGIN_PROFILE,
        REMOVE_AUTH
    }
})