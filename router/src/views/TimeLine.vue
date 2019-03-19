<template>
    <div>
        <router-link :to="{name: 'TimeLineId', params: {id :'recommended'} ,query:{name :'david'}}">推荐</router-link> |
        <router-link :to="{name: 'TimeLineId', params: {id :'following'}}">关注</router-link> | 
        <router-link :to="{name: 'TimeLineId', params: {id :'android'}}">Android</router-link> | 
        <router-link :to="{name: 'TimeLineId', params: {id :'frontend'}}">前端</router-link> 
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        created(){
            console.log(this.$route);
        }
    }
</script>

<style scoped>

</style>