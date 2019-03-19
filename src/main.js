import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
    //全局前置守卫,当一个导航触发时，全局前置守卫按照创建顺序调用
    // 数据校验时，非常有用 if(to.fullPath === '/home'){next('/login')}
    console.log('before Each')
    next();
})
router.beforeResolve((to, from, next) => {
    //全局解析守卫,2.5.0 新增,这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
    console.log('before Resolve')
    next();
})
router.afterEach((to, from) => {
    //全局后置钩子
    console.log('after each')
})