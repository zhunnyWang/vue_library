<template>
    <div>
        <p>{{ "我通过$route做动态路由匹配:" + $route.params.id }}</p>
        <p> {{ "我通过参数属性传递做动态路由匹配:" + id }}</p>
       
    </div>
</template>

<script>
    export default {
        props:['id'],
        //组件内的路由守卫
        beforeRouteEnter (to, from, next) {
            console.log("before Route Enter");
            next()
        },
        beforeRouteUpdate (to, from, next) {
            console.log("before Route Update");
            next()
        },
        beforeRouteLeave (to, from, next) {
            console.log("before Route Leave");
            next()
        }
    }
</script>

<style scoped>

</style>