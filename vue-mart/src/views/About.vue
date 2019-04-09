<template>
  <div class="about">
    <h1>{{ data }}</h1>
    
  </div>
</template>

<script>
import us from '@/services/user'
  export default {
    data() {
      return {
        data: "没有数据"
      }
    },
    created(){
      us.getuserInfo().then(res=>{
        const {code, data} = res.data;
        if(code == 1){
          this.data = data;
        }
      })
    }
  }
</script>

<style scoped>

</style>