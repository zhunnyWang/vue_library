<template>
  <div id="app">
    <h1>购物车</h1>
    <hr>
    <form autocomplete="off">
      <h2 v-text="msg"></h2>
      <div>
        <label for="courseName">课程名称: </label>
        <input type="text" id="courseName" v-model="courseInfo.courseName"/>
      </div>
      <div>
        <label for="price">课程价格: </label>
        <input type="text" id="price" v-model="courseInfo.price"/>
      </div>
      <div :style="marginTop">
        <button @click.prevent="addCourse">添加课程列表</button>
      </div>
    </form>
    <div>
      <div v-html="html"></div>
      <table>
        <tr>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>操作</th>
        </tr>
        <tr v-for="(course, index) in courseList" :key="course.id">
          <td>{{ course.courseName }}</td>
          <td>{{ course.price }}</td>
          <td>
            <button @click="addCart(index)">添加到购物车</button>
          </td>
        </tr>
      </table>
    </div>
    <Cart :courseCart="courseCart" @removeItem="remove"></Cart>
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue';

export default {
  name: 'app',
  components: {
    Cart
  },
  data() {
    return {
      msg:"添加课程",
      html:"<h2>课程列表</h2>",
      marginTop:{
        marginTop: "10px"
      },
      courseInfo:{
        courseName:"",
        price:""
      },
      courseList:[
        {
          id: 0,
          courseName: "web全栈开发架构师",
          price: "9998"
        },
        {
          id: 1,
          courseName:"Python人工智能",
          price: "8888"
        }
      ],
      courseCart:[]
    }
  },
  methods: {
    addCourse() {
      if(this.courseInfo.courseName != "" && this.courseInfo.price != ""){
          let hasCourse = this.courseList.find(value => value.courseName == this.courseInfo.courseName);
          if(hasCourse){
            alert("已添加该课程！");
            this.courseInfo.courseName = "";
            this.courseInfo.price = "";
            return;
          }
          this.courseList.push({
            id: this.courseList.length,
            courseName: this.courseInfo.courseName,
            price: this.courseInfo.price
          });
      }
      this.courseInfo.courseName = "";
      this.courseInfo.price = "";
    },
    addCart(index) {
      let course = this.courseList[index];
      let hasCourse = this.courseCart.find(value => value.id == course.id);
      if(hasCourse){
        hasCourse.number += 1;
      }else{
        this.courseCart.push({
          ...course,
          number: 1,
          isActive:true
        })
      }
    },
    remove(index){
      this.courseCart.splice(index,1)
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
