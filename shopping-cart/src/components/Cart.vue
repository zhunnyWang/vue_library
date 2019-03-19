<template>
    <div>
        <h2>我是购物车</h2>
        <table>
            <tr>
                <th>勾选</th>
                <th>课程名称</th>
                <th>课程价格</th>
                <th>数量</th>
                <th>价格</th>
            </tr>
            <tr v-for="(course, index) in courseCart" :key="courseCart.id">
                <td>
                    <input type="checkbox" v-model="course.isActive">
                </td>
                <td>
                    {{ course.courseName }}
                </td>
                <td>
                    {{ course.price }}
                </td>
                <td>
                    <button @click="minus(index)">-</button>
                    {{ course.number }}
                    <button @click="add(index)">+</button>
                </td>
                <td>
                    {{ course.number*course.price }}
                </td>
            </tr>
            <tr>
                <td></td>
                <td colspan="2">{{ activeNumber }} / {{courseCart.length}}</td>
                <td colspan="2">{{ totalPrice }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props:['courseCart'],
        computed:{
            activeNumber(){
                return this.courseCart.filter(value => value.isActive == true).length;
            },
            totalPrice(){
                let num = 0;
                let courses = this.courseCart.filter(value => value.isActive == true);
                courses.forEach(element => {
                    num += element.number * element.price
                });
                return num;
                    
            }
        },
        methods: {
            minus(index) {
                let number = this.courseCart[index].number;
                if(number > 1){
                    this.courseCart[index].number -= 1;
                }
                else{
                    //遵守单项数据流,让父组件来删除
                    if(window.confirm('确定要出删除吗')){
                        this.$emit('removeItem',index)
                    }
                }
            },
            add(index){
                this.courseCart[index].number ++;
            }
        },
    }
</script>

<style scoped>

</style>