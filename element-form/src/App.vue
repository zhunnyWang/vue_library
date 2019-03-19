<template>
  <div id="app">
    <div>
      <h3>Element表单</h3>
        <hr>
        <el-form :model="model" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          </el-form-item>
        </el-form>
   </div>
  <div>
    <h3>自定义表单组件</h3>
    <hr>

    
    <k-form :model="model" :rules="rules">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username"></k-input>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input v-model="model.password" type="password"></k-input>
      </k-form-item>
    </k-form>
  </div>
  </div>
</template>

<script>
import KInput from '@/components/KInput.vue';
import KFormItem from '@/components/KFormItem.vue';
import KForm from '@/components/KForm.vue';

export default {
  name: 'app',
  components: {
      KInput,
      KFormItem,
      KForm
    },
    provide(){
      return {
        // someval:"来自About.vue"
      }
    },
    data() {
    return {
      value:'',
      model: { username: "tom", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          {min: 6,max:10,message:'请输入6~10的用户名'}
        ],
        password: [
          { required: true, message: "请输入密码" }
        ],
      }
    };
  },
  methods: {
      submitForm(form) {
          this.$refs[form].validate(valid=>{
              if (valid) {
                  alert('请求登录!')
              } else {
                  alert('校验失败！')
              }
          })
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
