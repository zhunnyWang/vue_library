<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <cube-button v-if="$store.state.isLogin" @click="logout">注销</cube-button>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
