import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default app;