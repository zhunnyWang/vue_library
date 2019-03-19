<template>
  <div id="app">
    <div id="nav">
      <router-link to="/timeline">首页</router-link> |
      <router-link :to="{name: 'Activite'}">动态</router-link>
      <hr>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
body, html{
  height: 100%
}
</style>
