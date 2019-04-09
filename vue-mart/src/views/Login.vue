<template>
  <div>
    <cube-form :model="model" :schema="schema" @submit="handleLogin" @validate="haneldValidate"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        // groups:[
        // {
        legend: "登录",
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              type: "password",
              placeholder: "请输入密码",
              eye: { open: true }
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
        // }
        // ]
      }
    };
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      this.$store.dispatch("login", this.model).then(code => {
          if(code){
              const path = this.$route.query.redirect || '/';
              this.$router.push(path);
          }
      })
      .catch(error => {
          // 有错误发生或者登录失败
          const toast = this.$createToast({
            time: 2000,
            txt: error.message || error.response.data.message || "登录失败",
            type: "error"
          });
          toast.show();
      });
    },
    haneldValidate(ret) {
      console.log(ret);
    }
  }
};
</script>

<style scoped>
</style>