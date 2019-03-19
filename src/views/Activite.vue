<template>
    <div class="flex">
        <main>
            <router-view name="main"></router-view>
        </main>
        <aside>
            <router-view name="aside"></router-view>
        </aside>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style scoped>
.flex{
    display: flex;
    height: 100%;
    justify-content: center
}
main{
    width: 50%;
    height: 100%;
    border: 1px solid rosybrown;
}
aside{
    width:30%;
    border: 1px solid rosybrown
}
</style>