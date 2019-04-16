<template>
  <div id="app">
    <LoadWCS />
  </div>
</template>

<script>
import LoadWCS from './components/LoadWCS.vue';

export default {
  name: 'app',
  components: {
    LoadWCS
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.custom-ol-scaleline {
  background: rgba(0, 60, 136, 0.3);
  border-radius: 4px;
  bottom: 25px;
  right: 25px;
  padding: 2px;
  position: fixed;
}
.custom-ol-scaleline-inner {
  border: 1px solid #eee;
  border-top: none;
  color: #eee;
  font-size: 10px;
  text-align: center;
  margin: 1px;
  will-change: contents, width;
}
.custom-ol-rotate {
  position: relative;
  margin-top: 5px;
  top: -5px;
}
.text-danger {
  color: #f05050;
  margin-top: 5px;
}
/*d2 工具条*/
.d2-draw-helper {
  display: inline-block;
  margin: 10px;
  padding: 5px;
  background: white;
  border: none;
  position: relative;
  width: 280px;
  box-shadow: 5px 5px 5px #ccc;
}
.d2-draw-helper li {
  display: inline-block;
  background-color: #f0f3f4;
  list-style: none;
  margin-left: 5px;
  padding: 5px;
  height: 35px;
  color: #000;
  border: solid 1px #16aad8;
}
.row {
  float: left;
}
.rotatetarget {
  position: relative;
  top: 5px;
}
.MousePosition {
  width: 170px;
  text-align: center;
}
</style>
