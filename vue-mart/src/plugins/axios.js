"use strict";

import Vue from 'vue';
import axios from "axios";
import vm from '@/main';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const token = localStorage.getItem('token')
        if (token) { // 如果存在令牌这添加token请求头
            config.headers.Authorization = 'Bearer ' + token;
            // config.headers.token = token;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        if (error.response.status === 401) { // 没有登录或者令牌过期
            // 清空vuex和localstorage
            console.log(vm);
            vm.$store.dispatch("logout");
            // 跳转login
            vm.$router.push("/login");
        }
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;