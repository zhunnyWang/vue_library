<template>
    <div>
        <h2>i am Test</h2>
        <p>{{ count }}</p>
        <ul>
            <li v-for="(list, index) in lists" :key="list.id">
                {{list.msg}}
            </li>
        </ul>
        <p>{{ item }}</p>
    </div>
</template>

<script>
    export default {
        computed:{
            count(){
                return this.$store.state.count
            },
            lists(){
                return this.$store.getters.lists
            },
            item(){
                return this.$store.getters.item(2);
            }
        }
    }
</script>

<style scoped>

</style>