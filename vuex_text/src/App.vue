<template>
  <div id="app">
    <h2>{{ myProp }}</h2>
    <button  @click="changeStateProp">修改state数据</button>
    <p>{{ count }}</p>
    <button @click="addCount">同步+</button> |
    <button @click="addCountByasync">异步mutations+</button> |
    <button @click="addCountByasync2">异步Actions+</button>
    <!-- <p>{{ msg }}</p> -->
    <Test></Test>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Test from './components/Test.vue'
import {mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    Test
  },
  data() {
    return {
      num: 10
    }
  },
  // computed:{ //通过计算属性获取state，三种方式获取state
  // //第一种方式，获取单个State
  //   count(){
  //     return this.$store.state.count
  //   }
  // }
  //第二种方式，通过mapState辅助函数一次性获取多个State，mapState这个函数使用前需要从vuex导入
  // computed:mapState({
  //   //1.箭头函数
  //   count:state => state.count,
  //   msg:state => state.msg,
  //   //2.传字符串参数‘count’等同于state => state.count,counAlisa是别名,之前的都可以起别名
  //   countAlisa:'count',
  //   //3.传一个函数,可以在显示count之前再对它做一些操作
  //   countLocalState(state){
  //     return state.count + this.num;
  //   }
  // })
  //第三种方式，对象的展开运算符
  // computed:{
  //   ...mapState({
  //     //这里的操作与第二种方式是一样的
  //     count:state => state.count,
  //     countAlisa:'count',
  //     countLocalState(state){
  //       return state.count + this.num;
  //     }
  //   })
  // }
  //对象的展开运算符,当计算属性的方法名与state中属性名同名时，就可以这样简写
  computed:{
    ...mapState([
      'count',
      'msg',
    ]),
    myProp(){
      return this.$store.getters.myProp
    }
  },
  methods: {
    addCount() {
      this.$store.commit('addNum', 3);
    },
    addCountByasync(){
      //1.第一个参数是事件的名字，第二个参数是传递的数据
      // this.$store.commit('addCountByasync', 5)

      //以对象方式提交
      this.$store.commit({
        type:'addCountByasync',
        num:5
      })
    },
    addCountByasync2(){
      this.$store.dispatch('addCountByasync', {num: 5})
    },
    changeStateProp(){
      this.$store.dispatch('changeStateProp', {name:'kitty'});
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
