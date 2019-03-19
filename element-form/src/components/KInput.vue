<template>
    <div>
        <input :type="type" :value="value" @input="onInput">
    </div>
</template>

<script>
    export default {
        // inject:['someval'],
        props: {
            type: {
                type: String,
                default: "text"
            },
            value:{
                type: String,
                default:""
            }
        },
        methods: {
            onInput(e) {
                //本着单向数据流的约定，让父组件来修改value的值
                // console.log(e.target.value);
                let value = e.target.value;
                this.$emit('input', value);
                this.$parent.$emit('validate');
            }
        },
    }
</script>

<style scoped>

</style>